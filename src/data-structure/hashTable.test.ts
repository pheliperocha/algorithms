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

  const createPopulatedHashTable = (): HashTable<string> => {
    const hashTable = new HashTable<string>()

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
      const hashTable = new HashTable(10)

      hashTable.add(KEYS[3].key, KEYS[3].value)
      expect(hashTable.length).toBe(1)

      hashTable.add(KEYS[7].key, KEYS[7].value)
      expect(hashTable.length).toBe(2)

      expect(hashTable.get(KEYS[3].key)).toBe(KEYS[3].value)
      expect(hashTable.get(KEYS[7].key)).toBe(KEYS[7].value)
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
      const hashTable = new HashTable(10)
      hashTable.add(KEYS[3].key, KEYS[3].value)
      hashTable.add(KEYS[7].key, KEYS[7].value)

      expect(hashTable.get(KEYS[3].key)).toBe(KEYS[3].value)
      expect(hashTable.get(KEYS[7].key)).toBe(KEYS[7].value)
      expect(hashTable.get(KEYS[13].key)).toBeUndefined()
    })
  })

})