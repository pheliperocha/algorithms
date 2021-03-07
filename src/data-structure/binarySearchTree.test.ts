import { BinarySearchTree } from './binarySearchTree'

describe('Insert', () => {
  it('Should insert in correcly order for numbers', () => {
    const tree = new BinarySearchTree()
    tree.insert(10, 20, 8, 3, 4, 24)

    expect(tree.root?.get()).toBe(10)
    expect(tree.root?.left?.get()).toBe(8)
    expect(tree.root?.left?.left?.get()).toBe(3)
    expect(tree.root?.left?.left?.right?.get()).toBe(4)
    expect(tree.root?.right?.get()).toBe(20)
    expect(tree.root?.right?.right?.get()).toBe(24)
  })

  it('Should insert in correcly order for strings', () => {
    const tree = new BinarySearchTree()
    tree.insert(
      'Eren Yeager',
      'Levi Ackerman',
      'Mikasa Ackerman',
      'Armin Arlet',
      'Erwin Smith',
      'Hange Zoe',
    )

    expect(tree.root?.get()).toBe('Eren Yeager')
    expect(tree.root?.left?.get()).toBe('Armin Arlet')
    expect(tree.root?.right?.get()).toBe('Levi Ackerman')
    expect(tree.root?.right?.left?.get()).toBe('Erwin Smith')
    expect(tree.root?.right?.right?.get()).toBe('Mikasa Ackerman')
    expect(tree.root?.right?.left?.right?.get()).toBe('Hange Zoe')
  })
})
