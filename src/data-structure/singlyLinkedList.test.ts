import { SinglyLinkedList } from './singlyLinkedList'

describe('Singly Linked List', () => {
  const createMockList = <T = any>(size: number): SinglyLinkedList<T> => {
    const linkedList = new SinglyLinkedList()
    
    let count = 0
    while (count < size) {
      linkedList.push(count++)
    }

    return linkedList
  }

  it('Should create a empty', () => {
    const linkedList = new SinglyLinkedList()

    expect(linkedList.length()).toBe(0)
    expect(linkedList.getFirst().get()).toBeUndefined()
  })

  it('Should create with a node', () => {
    const value = 'mockValue'
    const linkedList = new SinglyLinkedList(value)

    expect(linkedList.length()).toBe(1)
    expect(linkedList.getFirst()?.get()).toBe(value)
  })

  it('Should appends new item, and returns the new size', () => {
    const lastValue = 999

    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    const size = linkedList.push(lastValue)

    expect(linkedList.length()).toBe(11)
    expect(size).toBe(11)
    expect(linkedList.getLast()?.get()).toBe(lastValue)
  })

  it('Should inserts new item at the start', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    
    const firstValue = 999
    linkedList.unshift(firstValue)

    expect(linkedList.length()).toBe(11)
    expect(linkedList.getFirst().get()).toBe(firstValue)
  })

  it('Should clear list', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    expect(linkedList.length()).toBe(10)

    linkedList.clear()

    expect(linkedList.length()).toBe(0)
    expect(linkedList.getFirst().get()).toBeUndefined()
    expect(linkedList.getLast().get()).toBeUndefined()
  })

  it('Should get item at index', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    const item = linkedList.getAt(3)
    expect(item?.get()).toBe(3)
  })

  it('Should return undefined for get item at index not populated', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    const item = linkedList.getAt(100)
    expect(item).toBeUndefined()
  })

  it('Should update item at index', () => {
    const linkedList = new SinglyLinkedList<number | string>(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    const item = linkedList.getAt(5)
    item?.set('Updated')
    expect(item?.get()).toBe('Updated')
  })

  it('Should remove first element', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    expect(linkedList.getFirst().get()).toBe(0)
    expect(linkedList.length()).toBe(10)

    const removedItem = linkedList.shift()

    expect(removedItem?.get()).toBe(0)
    expect(linkedList.getFirst().get()).toBe(1)
    expect(linkedList.length()).toBe(9)
  })

  it('Should remove first element in a list with size 1', () => {
    const linkedList = createMockList(1)
    expect(linkedList.getFirst().get()).toBe(0)
    expect(linkedList.length()).toBe(1)

    const removedItem = linkedList.shift()

    expect(removedItem?.get()).toBe(0)
    expect(linkedList.getFirst().get()).toBeUndefined()
    expect(linkedList.length()).toBe(0)
  })

  it('Should remove last element', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    expect(linkedList.getLast().get()).toBe(9)
    expect(linkedList.length()).toBe(10)

    const removedItem = linkedList.pop()

    expect(removedItem?.get()).toBe(9)
    expect(linkedList.getLast().get()).toBe(8)
    expect(linkedList.length()).toBe(9)
  })

  it('Should remove last element from 1 item list', () => {
    const linkedList = createMockList(1)
    expect(linkedList.getLast().get()).toBe(0)
    expect(linkedList.length()).toBe(1)

    const removedItem = linkedList.pop()

    expect(removedItem?.get()).toBe(0)
    expect(linkedList.getLast().get()).toBeUndefined()
    expect(linkedList.length()).toBe(0)
  })

  it('Should insert item at 0 index', () => {
    const linkedList = new SinglyLinkedList()
    
    const newItem = linkedList.insertAt(0, 'newItem')
    expect(newItem?.get()).toBe('newItem')
    expect(linkedList.getFirst().get()).toBe('newItem')
    expect(linkedList.getLast().get()).toBe('newItem')
    expect(linkedList.length()).toBe(1)
  })

  it('Should insert item at undefined index', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

    const newItem = linkedList.insertAt(10, 999)
    expect(newItem?.get()).toBeUndefined()
    expect(linkedList.getFirst().get()).toBe(0)
    expect(linkedList.getLast().get()).toBe(9)
    expect(linkedList.length()).toBe(10)
  })

  it('Should insert item at index', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    expect(linkedList.length()).toBe(10)
    expect(linkedList.getAt(5)?.get()).toBe(5)
    expect(linkedList.getAt(6)?.get()).toBe(6)

    const newItem = linkedList.insertAt(5, 999)
    expect(newItem?.get()).toBe(999)
    expect(linkedList.length()).toBe(11)
    expect(linkedList.getAt(4)?.getNext()?.get()).toBe(999)
    expect(linkedList.getAt(5)?.get()).toBe(999)
    expect(linkedList.getAt(6)?.get()).toBe(5)
  })

  it('Should insert item at last element', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    expect(linkedList.length()).toBe(10)
    expect(linkedList.getLast().get()).toBe(9)
    expect(linkedList.getAt(9)?.get()).toBe(9)
    expect(linkedList.getAt(9)?.getNext()).toBeUndefined()
    expect(linkedList.getAt(10)?.get()).toBeUndefined()
    
    const newItem = linkedList.insertAt(9, 999)
    
    expect(newItem?.get()).toBe(999)
    expect(linkedList.length()).toBe(11)
    expect(linkedList.getLast().get()).toBe(9)
    expect(linkedList.getAt(8)?.getNext()?.get()).toBe(999)
    expect(linkedList.getAt(9)?.get()).toBe(999)
    expect(linkedList.getAt(9)?.getNext()?.get()).toBe(9)
    expect(linkedList.getAt(10)?.get()).toBe(9)
    expect(linkedList.getAt(10)?.getNext()).toBeUndefined()
  })
  
  it('Should interate over the list with for...of...', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    
    let i = 0
    for (const value of linkedList) {
      expect(i).toBe(value)
      i++
    }
  })

  it('Should interate over the list with spread operator', () => {
    const linkedList = new SinglyLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
    const arr = [...linkedList]
    expect(arr).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('Should convert to string with comman separator', () => {
    const linkedList = createMockList(3)
    expect(linkedList.toString()).toBe('0, 1, 2')
  })

  it('Should convert to string with comman separator with template literals', () => {
    const linkedList = createMockList(3)
    expect(`${linkedList}`).toBe('0, 1, 2')
  })

  it('Should convert to string with : separator', () => {
    const linkedList = createMockList(3)
    expect(linkedList.toString(':')).toBe('0:1:2')
  })

  it('Should find the first node', () => {
    const linkedList = createMockList<number>(30)
    const result = linkedList.find(_ => {
      return true
    })

    expect(result!.get()).toBe(0)
  })

  it('Should not find any node', () => {
    const linkedList = createMockList<number>(30)
    const result = linkedList.find(_ => {
      return false
    })

    expect(result).toBeUndefined()
  })

  it('Should find a node by the predicator', () => {
    const linkedList = createMockList<number>(30)
    const result = linkedList.find((value: number) => (value === 15))
    expect(result?.get()).toBe(15)
  })
})