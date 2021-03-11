import { BinarySearchTree } from './binarySearchTree'

describe('Insert', () => {
  enum Sector {
    ENERGY = 'energy',
    TECH = 'tech',
    FINANCIAL = 'financial',
  }

  type Ticker = { sector: Sector; ticker: string; price: number }

  const stocks: Ticker[] = [
    { sector: Sector.ENERGY, ticker: 'XOM', price: 6087 },
    { sector: Sector.FINANCIAL, ticker: 'BRK.B', price: 25761 },
    { sector: Sector.TECH, ticker: 'GOOGL', price: 200750 },
    { sector: Sector.ENERGY, ticker: 'CVX', price: 10975 },
    { sector: Sector.FINANCIAL, ticker: 'JPM', price: 15291 },
    { sector: Sector.TECH, ticker: 'AMZN', price: 295195 },
  ]

  const sectorWeight = {
    [Sector.TECH]: 1,
    [Sector.ENERGY]: 2,
    [Sector.FINANCIAL]: 3,
  }

  const compareFn = (
    tickerA: Partial<Ticker>,
    tickerB: Partial<Ticker>,
  ): number => {
    if (tickerA.ticker === tickerB.ticker) return 0

    if (
      tickerA.sector &&
      tickerB.sector &&
      sectorWeight[tickerA.sector] > sectorWeight[tickerB.sector]
    ) {
      return 1
    }

    return -1
  }

  it('Should insert in correcly order for numbers', () => {
    const tree = new BinarySearchTree<number>()
    tree.insert(10, 20, 8, 3, 4, 24)

    expect(tree.lenght).toBe(6)
    expect(tree.root?.get()).toBe(10)
    expect(tree.root?.parent?.get()).toBeUndefined()
    expect(tree.root?.left?.get()).toBe(8)
    expect(tree.root?.left?.parent?.get()).toBe(10)
    expect(tree.root?.left?.left?.get()).toBe(3)
    expect(tree.root?.left?.left?.parent?.get()).toBe(8)
    expect(tree.root?.left?.left?.right?.get()).toBe(4)
    expect(tree.root?.left?.left?.right?.parent?.get()).toBe(3)
    expect(tree.root?.right?.get()).toBe(20)
    expect(tree.root?.right?.parent?.get()).toBe(10)
    expect(tree.root?.right?.right?.get()).toBe(24)
    expect(tree.root?.right?.right?.parent?.get()).toBe(20)
  })

  it('Should insert in correcly order for strings', () => {
    const tree = new BinarySearchTree<string>()
    tree.insert(
      'Eren Yeager',
      'Levi Ackerman',
      'Mikasa Ackerman',
      'Armin Arlet',
      'Erwin Smith',
      'Hange Zoe',
    )

    expect(tree.lenght).toBe(6)
    expect(tree.root?.get()).toBe('Eren Yeager')
    expect(tree.root?.parent?.get()).toBeUndefined()
    expect(tree.root?.left?.get()).toBe('Armin Arlet')
    expect(tree.root?.left?.parent?.get()).toBe('Eren Yeager')
    expect(tree.root?.right?.get()).toBe('Levi Ackerman')
    expect(tree.root?.right?.parent?.get()).toBe('Eren Yeager')
    expect(tree.root?.right?.left?.get()).toBe('Erwin Smith')
    expect(tree.root?.right?.left?.parent?.get()).toBe('Levi Ackerman')
    expect(tree.root?.right?.right?.get()).toBe('Mikasa Ackerman')
    expect(tree.root?.right?.right?.parent?.get()).toBe('Levi Ackerman')
    expect(tree.root?.right?.left?.right?.get()).toBe('Hange Zoe')
    expect(tree.root?.right?.left?.right?.parent?.get()).toBe('Erwin Smith')
  })

  it('Should insert in correcly order for custom object', () => {
    const tree = new BinarySearchTree<Ticker>(compareFn)
    tree.insert(...stocks)

    expect(tree.lenght).toBe(6)
    expect(tree.root?.get()).toStrictEqual(stocks[0])
    expect(tree.root?.left?.get()).toStrictEqual(stocks[2])
    expect(tree.root?.left?.right?.get()).toStrictEqual(stocks[5])
    expect(tree.root?.right?.get()).toStrictEqual(stocks[1])
    expect(tree.root?.right?.left?.get()).toStrictEqual(stocks[3])
    expect(tree.root?.right?.right?.get()).toStrictEqual(stocks[4])
  })

  it('Should find the element on tree of numbers', () => {
    const tree = new BinarySearchTree<number>()
    tree.insert(3, 14, 15, 9, 2, 65, 35)
    const leafA = tree.find(3)
    const leafB = tree.find(35)
    const leafC = tree.find(9)
    const leafD = tree.find(33)

    expect(leafA?.get()).toBe(3)
    expect(leafB?.get()).toBe(35)
    expect(leafC?.get()).toBe(9)
    expect(leafD?.get()).toBeUndefined()
  })

  it('Should find the element on tree of string', () => {
    const tree = new BinarySearchTree<string>()
    tree.insert(
      'Pi',
      'Eulers number',
      'Universal parabolic',
      'Golden angle',
      'Twin Primes',
      'Fibonacci',
      'Kepler–Bouwkamp',
    )
    const leafA = tree.find('Golden angle')
    const leafB = tree.find('Fibonacci')
    const leafC = tree.find('DeViccis tesseract')

    expect(leafA?.get()).toBe('Golden angle')
    expect(leafB?.get()).toBe('Fibonacci')
    expect(leafC?.get()).toBeUndefined()
  })

  it('Should find the element on a tree of custom object', () => {
    const tree = new BinarySearchTree<Ticker>(compareFn)
    tree.insert(...stocks)

    const leafA = tree.find({ sector: Sector.TECH, ticker: 'GOOGL' })
    const leafB = tree.find({ sector: Sector.FINANCIAL, ticker: 'JPM' })
    const leafC = tree.find({ sector: Sector.ENERGY, ticker: 'DOFSQ' })

    expect(leafA?.get().price).toBe(200750)
    expect(leafB?.get().price).toBe(15291)
    expect(leafC?.get()).toBeUndefined()
  })

  it('Should return false when deleting an empty tree', () => {
    const tree = new BinarySearchTree<number>()
    const result = tree.delete(2.7182)

    expect(tree.lenght).toBe(0)
    expect(result).toBeFalsy()
  })

  it('Should return false when trying to delete a not included value', () => {
    const tree = new BinarySearchTree<number>()
    tree.insert(6.626068, 10, -34, 2)
    const result = tree.delete(1.618)

    expect(tree.lenght).toBe(4)
    expect(result).toBeFalsy()
  })

  it('Should delete the leaf that doen\'st have any children', () => {
    const tree = new BinarySearchTree<number>()
    tree.insert(5, 2, 13, 3, 1, 8, 21, 0, 34)
    expect(tree.lenght).toBe(9)
    const result = tree.delete(34)

    expect(tree.lenght).toBe(8)
    expect(result).toBeTruthy()

    expect(tree.root?.get()).toBe(5)
    expect(tree.root?.left?.get()).toBe(2)
    expect(tree.root?.right?.get()).toBe(13)
    expect(tree.root?.left?.left?.get()).toBe(1)
    expect(tree.root?.left?.left?.left?.get()).toBe(0)
    expect(tree.root?.left?.left?.right?.get()).toBeUndefined()
    expect(tree.root?.left?.right?.get()).toBe(3)
    expect(tree.root?.left?.right?.left?.get()).toBeUndefined()
    expect(tree.root?.left?.right?.right?.get()).toBeUndefined()
    expect(tree.root?.right?.left?.get()).toBe(8)
    expect(tree.root?.right?.left?.left?.get()).toBeUndefined()
    expect(tree.root?.right?.left?.right?.get()).toBeUndefined()
    expect(tree.root?.right?.right?.get()).toBe(21)
    expect(tree.root?.right?.right?.left?.get()).toBeUndefined()
    expect(tree.root?.right?.right?.right?.get()).toBeUndefined()
  })

  it("Should delete the leaf that have only one child on left", () => {
    const tree = new BinarySearchTree<number>()
    tree.insert(5, 2, 13, 3, 1, 8, 21, 0, 34)
    expect(tree.lenght).toBe(9)
    const result = tree.delete(1)

    expect(tree.lenght).toBe(8)
    expect(result).toBeTruthy()

    expect(tree.root?.get()).toBe(5)
    expect(tree.root?.left?.get()).toBe(2)
    expect(tree.root?.right?.get()).toBe(13)
    expect(tree.root?.left?.left?.get()).toBe(0)
    expect(tree.root?.left?.left?.left?.get()).toBeUndefined()
    expect(tree.root?.left?.left?.right?.get()).toBeUndefined()
    expect(tree.root?.left?.right?.get()).toBe(3)
    expect(tree.root?.left?.right?.left?.get()).toBeUndefined()
    expect(tree.root?.left?.right?.right?.get()).toBeUndefined()
    expect(tree.root?.right?.left?.get()).toBe(8)
    expect(tree.root?.right?.left?.left?.get()).toBeUndefined()
    expect(tree.root?.right?.left?.right?.get()).toBeUndefined()
    expect(tree.root?.right?.right?.get()).toBe(21)
    expect(tree.root?.right?.right?.left?.get()).toBeUndefined()
    expect(tree.root?.right?.right?.right?.get()).toBe(34)
  })

  it('Should delete the leaf that have only one child on right', () => {
    const tree = new BinarySearchTree<number>()
    tree.insert(5, 2, 13, 3, 1, 8, 21, 0, 34)
    expect(tree.lenght).toBe(9)
    const result = tree.delete(21)

    expect(tree.lenght).toBe(8)
    expect(result).toBeTruthy()

    expect(tree.root?.get()).toBe(5)
    expect(tree.root?.left?.get()).toBe(2)
    expect(tree.root?.right?.get()).toBe(13)
    expect(tree.root?.left?.left?.get()).toBe(1)
    expect(tree.root?.left?.left?.left?.get()).toBe(0)
    expect(tree.root?.left?.left?.right?.get()).toBeUndefined()
    expect(tree.root?.left?.right?.get()).toBe(3)
    expect(tree.root?.left?.right?.left?.get()).toBeUndefined()
    expect(tree.root?.left?.right?.right?.get()).toBeUndefined()
    expect(tree.root?.right?.left?.get()).toBe(8)
    expect(tree.root?.right?.left?.left?.get()).toBeUndefined()
    expect(tree.root?.right?.left?.right?.get()).toBeUndefined()
    expect(tree.root?.right?.right?.get()).toBe(34)
    expect(tree.root?.right?.right?.left?.get()).toBeUndefined()
    expect(tree.root?.right?.right?.right?.get()).toBeUndefined()
  })

  it('Should delete the leaf that have two children', () => {
    const tree = new BinarySearchTree<number>()
    tree.insert(5, 2, 13, 3, 1, 8, 21, 0, 34)
    expect(tree.lenght).toBe(9)
    const result = tree.delete(13)

    expect(tree.lenght).toBe(8)
    expect(result).toBeTruthy()

    expect(tree.root?.get()).toBe(5)
    expect(tree.root?.left?.get()).toBe(2)
    expect(tree.root?.right?.get()).toBe(21)

    expect(tree.root?.left?.left?.get()).toBe(1)
    expect(tree.root?.left?.left?.left?.get()).toBe(0)
    expect(tree.root?.left?.left?.right?.get()).toBeUndefined()
  
    expect(tree.root?.left?.right?.get()).toBe(3)
    expect(tree.root?.left?.right?.left?.get()).toBeUndefined()
    expect(tree.root?.left?.right?.right?.get()).toBeUndefined()

    expect(tree.root?.right?.left?.get()).toBe(8)
    expect(tree.root?.right?.left?.left?.get()).toBeUndefined()
    expect(tree.root?.right?.left?.right?.get()).toBeUndefined()
  
    expect(tree.root?.right?.right?.get()).toBe(34)
    expect(tree.root?.right?.right?.left?.get()).toBeUndefined()
    expect(tree.root?.right?.right?.right?.get()).toBeUndefined()
  })
})