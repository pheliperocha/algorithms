import { Stack } from './stack'

describe('Stack', () => {
  const createMockStack = (size: number): Stack<number> => {
    const stack = new Stack(0)

    let count = 0
    while (count < size) {
      stack.push(count++)
    }

    return stack
  }

  it('Create a empty stack', () => {
    const stack = new Stack()
    expect(stack.length()).toBe(0)
  })

  it('Create a stack with 3 items', () => {
    const stack = createMockStack(3)
    expect(stack.length()).toBe(3)
  })

  it('Stack up a new item, and returns the new size of the stack', () => {
    const newItem = 999

    const stack = createMockStack(10)
    const size = stack.push(newItem)

    expect(stack.length()).toBe(11)
    expect(size).toBe(11)
  })

  it('Take out the last element and return it', () => {
    const stack = createMockStack(10)
    expect(stack.length()).toBe(10)

    const item = stack.pop()

    expect(item).toBe(9)
    expect(stack.length()).toBe(9)
  })

  it('Get the top item', () => {
    const stack = createMockStack(10)
    expect(stack.length()).toBe(10)

    const item = stack.peek()

    expect(item).toBe(9)
    expect(stack.length()).toBe(10)
  })
})

