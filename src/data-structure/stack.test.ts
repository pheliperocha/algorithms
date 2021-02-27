import { SinglyLinkedList } from './singlyLinkedList'
import { Stack } from './stack'

describe('Stack', () => {
  const createMockStack = <T>(size: number): Stack<T> => {
    const list = new SinglyLinkedList()

    let count = 0
    while (count < size) {
      list.push(count++)
    }

    return new Stack(list)
  }

  it('Create a empty stack', () => {
    const stack = new Stack()
    expect(stack.length()).toBe(0)
  })

  it('Create a stack with 3 items', () => {
    const stack = createMockStack(3)
    expect(stack.length()).toBe(3)
  })
})

