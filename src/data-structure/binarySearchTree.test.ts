import { BinarySearchTree } from './binarySearchTree'

describe('Insert', () => {
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

    const compareFn = (tickerA: Ticker, tickerB: Ticker) => {
      if (sectorWeight[tickerA.sector] > sectorWeight[tickerB.sector]) {
        return 1
      }
      return -1
    }

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
})
