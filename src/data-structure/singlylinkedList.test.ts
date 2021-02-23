import { SinglyLinkedList } from './singlylinkedList'

describe('Singly Linked List', () => {
  const createMockList = <T = any>(size: number): SinglyLinkedList<T> => {
    const linkedList = new SinglyLinkedList()
    
    let count = 0
    while (count < size) {
      linkedList.push(count++)
    }

    return linkedList
  }

  it('Create a empty', () => {
    const linkedList = new SinglyLinkedList()

    expect(linkedList.size).toBe(0)
    expect(linkedList.getFirst().get()).toBeUndefined()
  })

  it('Create with a node', () => {
    const value = 'mockValue'
    const linkedList = new SinglyLinkedList(value)

    expect(linkedList.size).toBe(1)
    expect(linkedList.getFirst()?.get()).toBe(value)
  })

  it('Appends new item, and returns the new size', () => {
    const lastValue = 'mockValue'

    const linkedList = createMockList(10)
    const size = linkedList.push(lastValue)

    expect(linkedList.size).toBe(11)
    expect(size).toBe(11)
    expect(linkedList.getLast()?.get()).toBe(lastValue)
  })

  it('Inserts new item at the start', () => {
    const linkedList = createMockList(10)
    
    const firstValue = 'mockValue'
    linkedList.unshift(firstValue)

    expect(linkedList.size).toBe(11)
    expect(linkedList.getFirst().get()).toBe(firstValue)
  })

  it('Clear list', () => {
    const linkedList = createMockList(10)
    expect(linkedList.size).toBe(10)

    linkedList.clear()

    expect(linkedList.size).toBe(0)
    expect(linkedList.getFirst().get()).toBeUndefined()
    expect(linkedList.getLast().get()).toBeUndefined()
  })

  it('Get item at index', () => {
    const linkedList = createMockList(10)
    const item = linkedList.getAt(3)
    expect(item?.get()).toBe(3)
  })

  it('Return undefined for get item at index not populated', () => {
    const linkedList = createMockList(10)
    const item = linkedList.getAt(100)
    expect(item).toBeUndefined()
  })

  it('Update item at index', () => {
    const linkedList = createMockList(10)
    const item = linkedList.getAt(5)
    item?.set('Updated')
    expect(item?.get()).toBe('Updated')
  })

  it('Remove first element', () => {
    const linkedList = createMockList(10)
    expect(linkedList.getFirst().get()).toBe(0)
    expect(linkedList.size).toBe(10)

    const removedItem = linkedList.shift()

    expect(removedItem?.get()).toBe(0)
    expect(linkedList.getFirst().get()).toBe(1)
    expect(linkedList.size).toBe(9)
  })

  it('Remove first element in a list with size 1', () => {
    const linkedList = createMockList(1)
    expect(linkedList.getFirst().get()).toBe(0)
    expect(linkedList.size).toBe(1)

    const removedItem = linkedList.shift()

    expect(removedItem?.get()).toBe(0)
    expect(linkedList.getFirst().get()).toBeUndefined()
    expect(linkedList.size).toBe(0)
  })

  it('Remove last element', () => {
    const linkedList = createMockList(10)
    expect(linkedList.getLast().get()).toBe(9)
    expect(linkedList.size).toBe(10)

    const removedItem = linkedList.pop()

    expect(removedItem?.get()).toBe(9)
    expect(linkedList.getLast().get()).toBe(8)
    expect(linkedList.size).toBe(9)
  })

  it('Remove last element from 1 item list', () => {
    const linkedList = createMockList(1)
    expect(linkedList.getLast().get()).toBe(0)
    expect(linkedList.size).toBe(1)

    const removedItem = linkedList.pop()

    expect(removedItem?.get()).toBe(0)
    expect(linkedList.getLast().get()).toBeUndefined()
    expect(linkedList.size).toBe(0)
  })

  it('Insert item at 0 index', () => {
    const linkedList = new SinglyLinkedList()
    
    const newItem = linkedList.insertAt(0, 'newItem')
    expect(newItem?.get()).toBe('newItem')
    expect(linkedList.getFirst().get()).toBe('newItem')
    expect(linkedList.getLast().get()).toBe('newItem')
    expect(linkedList.size).toBe(1)
  })

  it('Insert item at undefined index', () => {
    const linkedList = createMockList(10)

    const newItem = linkedList.insertAt(10, 'newItem')
    expect(newItem?.get()).toBeUndefined()
    expect(linkedList.getFirst().get()).toBe(0)
    expect(linkedList.getLast().get()).toBe(9)
    expect(linkedList.size).toBe(10)
  })

  it('Insert item at index', () => {
    const linkedList = createMockList(10)
    expect(linkedList.size).toBe(10)
    expect(linkedList.getAt(5)?.get()).toBe(5)
    expect(linkedList.getAt(6)?.get()).toBe(6)

    const newItem = linkedList.insertAt(5, 'newItem')
    expect(newItem?.get()).toBe('newItem')
    expect(linkedList.size).toBe(11)
    expect(linkedList.getAt(4)?.next?.get()).toBe('newItem')
    expect(linkedList.getAt(5)?.get()).toBe('newItem')
    expect(linkedList.getAt(6)?.get()).toBe(5)
  })

  it('Insert item at last element', () => {
    const linkedList = createMockList(10)
    expect(linkedList.size).toBe(10)
    expect(linkedList.getLast().get()).toBe(9)
    expect(linkedList.getAt(9)?.get()).toBe(9)
    expect(linkedList.getAt(9)?.next).toBeNull()
    expect(linkedList.getAt(10)?.get()).toBeUndefined()
    
    const newItem = linkedList.insertAt(9, 'newItem')
    
    expect(newItem?.get()).toBe('newItem')
    expect(linkedList.size).toBe(11)
    expect(linkedList.getLast().get()).toBe(9)
    expect(linkedList.getAt(8)?.next?.get()).toBe('newItem')
    expect(linkedList.getAt(9)?.get()).toBe('newItem')
    expect(linkedList.getAt(9)?.next?.get()).toBe(9)
    expect(linkedList.getAt(10)?.get()).toBe(9)
    expect(linkedList.getAt(10)?.next).toBeNull()
  })
  
  it('Interate over the list', () => {
    const linkedList = createMockList(10)
    
    let i = 0
    for (const value of linkedList) {
      expect(i).toBe(value)
      i++
    }

    const arr = [...linkedList]
    expect(arr).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('toString', () => {
    const linkedList = createMockList(3)

    expect(`${linkedList}`).toBe('0, 1, 2')
    expect(linkedList.toString()).toBe('0, 1, 2')
    expect(linkedList.toString(':')).toBe('0:1:2')
  })
})