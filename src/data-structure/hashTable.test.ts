import { HashTable } from './hashTable'

describe('HashTable', () => {
  const KEYS = [
    { key: 'Star wars', value: 'May the Force be with you.' },
    { key: 'The Godfather', value: 'I\'m going to make him an offer he can\'t refuse.' },
    { key: 'Taxi Driver', value: 'You talkin\' to me?' },
    { key: 'The Sixth Sense', value: 'I see dead people.' }, //
    { key: 'Fight Club', value: 'The first rule of Fight Club is: You do not talk about Fight Club.' },
    { key: 'The Dark Knight', value: 'Why so serious?' },
    { key: 'Toy Story', value: 'To infinity and beyond!' },
    { key: 'Apollo 13', value: 'Houston, we have a problem.' }, //
    { key: 'King Kong', value: 'It was Beauty killed the Beast.' },
    { key: 'Pulp Fiction', value: 'They call it a Royale with cheese.' },
    { key: '12 Years a Slave', value: 'I don\'t want to survive. I want to live.' },
    { key: 'Babe', value: 'That\'ll do, pig.That\'ll do.' },
    { key: 'Sherlock Holmes', value: 'Elementary, my dear Watson.' },
    { key: 'Good morning, Vietnam!', value: 'Good morning, Vietnam!' }, //
  ]

  const createPopulatedHashTable = (bucketSize?: number, automaticallyResize: boolean = false): HashTable<string> => {
    const hashTable = new HashTable<string>(bucketSize, null, automaticallyResize)

    for (const { key, value } of KEYS) {
      hashTable.add(key, value)
    }
    
    return hashTable
  }

  describe('Add', () => {
    it('Should add a new elements and return the new length', () => {
      const hashTable = new HashTable<{ timestamp: Date }>()
      expect(hashTable.length).toBe(0)

      const lenght = hashTable.add('First key', { timestamp: new Date() })
      expect(lenght).toBe(1)
      expect(hashTable.length).toBe(1)

      const newLength = hashTable.add('Second Key', { timestamp: new Date() })
      expect(newLength).toBe(2)
      expect(hashTable.length).toBe(2)
    })

    it('Should update if key already exists', () => {
      const hashTable = new HashTable<number>()
      expect(hashTable.length).toBe(0)

      const lenght = hashTable.add('First key', 41)
      expect(lenght).toBe(1)
      expect(hashTable.length).toBe(1)
      expect(hashTable.get('First key')).toBe(41)

      const newLength = hashTable.add('First key', 7)
      expect(newLength).toBe(1)
      expect(hashTable.length).toBe(1)
      expect(hashTable.get('First key')).toBe(7)
    })

    it('Should correct value even with collision', () => {
      const hashTable = new HashTable(10, null, false)

      hashTable.add(KEYS[3].key, KEYS[3].value)
      expect(hashTable.length).toBe(1)

      hashTable.add(KEYS[7].key, KEYS[7].value)
      expect(hashTable.length).toBe(2)

      expect(hashTable.get(KEYS[3].key)).toBe(KEYS[3].value)
      expect(hashTable.get(KEYS[7].key)).toBe(KEYS[7].value)
    })

    it('Should correcly resize the HashTable', () => {
      const hashTable = createPopulatedHashTable(10)
      expect(hashTable.capacity).toBe(10)
      expect(hashTable.length).toBe(14)
      expect(hashTable.get(KEYS[6].key)).toBe(KEYS[6].value)

      hashTable.resize(20)
      expect(hashTable.capacity).toBe(20)
      expect(hashTable.length).toBe(14)
      expect(hashTable.get(KEYS[6].key)).toBe(KEYS[6].value)
    })

    it('Should not automatically resize', () => {
      const hashTable = createPopulatedHashTable(5)
      expect(hashTable.capacity).toBe(5)
    })

    it('Should automatically resize', () => {
      const hashTable = createPopulatedHashTable(5, true)
      expect(hashTable.capacity).toBe(20)
    })
  })

  describe('Get', () => {
    it('Should get undefined with non-exist key', () => {
      const hashTable = createPopulatedHashTable()
      expect(hashTable.get('Secret key')).toBeUndefined()
    })

    it('Should get the corret element', () => {
      const hashTable = createPopulatedHashTable()

      expect(hashTable.get(KEYS[0].key)).toBe(KEYS[0].value)
      expect(hashTable.get(KEYS[3].key)).toBe(KEYS[3].value)
    })

    it('Should return undefined, if dont find key bucket with collision hash', () => {
      const hashTable = new HashTable(10, null, false)
      hashTable.add(KEYS[3].key, KEYS[3].value)
      hashTable.add(KEYS[7].key, KEYS[7].value)

      expect(hashTable.get(KEYS[3].key)).toBe(KEYS[3].value)
      expect(hashTable.get(KEYS[7].key)).toBe(KEYS[7].value)
      expect(hashTable.get(KEYS[13].key)).toBeUndefined()
    })
  })

  describe('Remove', () => {
    it('Should return false with non-exist key', () => {
      const hashTable = createPopulatedHashTable()
      expect(hashTable.remove('Secret key')).toBe(false)
    })

    it('Should remove a element by key', () => {
      const hashTable = createPopulatedHashTable(3)
      expect(hashTable.length).toBe(14)
      expect(hashTable.get(KEYS[9].key)).toBe(KEYS[9].value)

      const removed = hashTable.remove(KEYS[9].key)
      expect(removed).toBe(true)
      expect(hashTable.length).toBe(13)
      expect(hashTable.get(KEYS[9].key)).toBeUndefined()
    })
  })

  describe('Loan Factor', () => {
    it('Should prevent from create a HashTable with LoadFactor less than or equal to 3', () => {
      const hashTable1 = new HashTable(541, 0.3)
      expect(hashTable1.loadFactor).toBe(0.3)

      const hashTable2 = new HashTable(541, 0.2999)
      expect(hashTable2.loadFactor).toBe(0.75)

      const hashTable3 = new HashTable(541, 0.3001)
      expect(hashTable3.loadFactor).toBe(0.3001)
    })

    it('Should prevent from create a HashTable with LoadFactor greater than or equal to 1', () => {
      const hashTable1 = new HashTable(541, 1)
      expect(hashTable1.loadFactor).toBe(1)

      const hashTable2 = new HashTable(541, 0.9999)
      expect(hashTable2.loadFactor).toBe(0.9999)

      const hashTable3 = new HashTable(541, 1.001)
      expect(hashTable3.loadFactor).toBe(0.75)
    })

    it('Should throw a Error when trying set a LoadFactor less than or equal to 3', () => {
      const hashTable1 = new HashTable()
      expect(() => hashTable1.loadFactor = 0.3).not.toThrow()
      expect(() => hashTable1.loadFactor = 0.2999).toThrow()
      expect(() => hashTable1.loadFactor = 0.3001).not.toThrow()
    })

    it('Should throw a Error when trying set a LoadFactor greater than or equal to 1', () => {
      const hashTable1 = new HashTable()
      expect(() => hashTable1.loadFactor = 1).not.toThrow()
      expect(() => hashTable1.loadFactor = 0.9999).not.toThrow()
      expect(() => hashTable1.loadFactor = 1.001).toThrow()
    })
  })
})