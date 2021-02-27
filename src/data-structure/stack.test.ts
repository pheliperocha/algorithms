import { Stack } from './stack'

describe('Stack', () => {
  describe('Constructor and lenght', () => {
    it('Create a empty stack', () => {
      const stack = new Stack()
      expect(stack.length()).toBe(0)
    })

    it('Create a stack with 3 items', () => {
      const stack = new Stack(3, 2, 1)
      expect(stack.length()).toBe(3)
    })
  })

  describe('Push', () => {
    it('Stack up a new item, and returns the new size of the stack', () => {
      const newItem = 999

      const stack = new Stack(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
      expect(stack.length()).toBe(10)

      const size = stack.push(newItem)

      expect(stack.length()).toBe(11)
      expect(size).toBe(11)
    })
  })

  describe('Pop', () => {
    it('Take out the last element and return it', () => {
      const stack = new Stack(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
      expect(stack.length()).toBe(10)

      const item = stack.pop()

      expect(item).toBe(9)
      expect(stack.length()).toBe(9)
    })
  })

  describe('Peek', () => {
    it('Get the top item', () => {
      const stack = new Stack(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
      expect(stack.length()).toBe(10)

      const item = stack.peek()

      expect(item).toBe(9)
      expect(stack.length()).toBe(10)
    })
  })
})

