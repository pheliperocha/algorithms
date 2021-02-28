import { Queue } from './queue'

describe('Constructor and lenght', () => {
  it('Should create a empty queue', () => {
    const queue = new Queue()
    expect(queue.length()).toBe(0)
  })

  it('Should create queue with one item', () => {
    const queue = new Queue('value')
    expect(queue.length()).toBe(1)
  })

  it('Should create queue with 5 item', () => {
    const queue = new Queue(9, 8, 7, 6, 5)
    expect(queue.length()).toBe(5)
  })
})

describe('enqueue', () => {
  it('Should enqueue a new item in a empty queue', () => {
    const queue = new Queue()
    expect(queue.length()).toBe(0)
    queue.enqueue('New item')
    expect(queue.length()).toBe(1)
  })

  it('Should enqueue a new item with populated queue', () => {
    const queue = new Queue('First', 'Second', 'Third')
    expect(queue.length()).toBe(3)
    queue.enqueue('New item')
    expect(queue.length()).toBe(4)
  })
})

describe.only('Dequeue', () => {
  it('Should return undefined when dequeue a empty queue', () => {
    const queue = new Queue()
    const item = queue.dequeue()
    expect(item).toBeUndefined()
  })

  it('Should return item when dequeue', () => {
    const queue = new Queue(1, 2, 3)
    const item = queue.dequeue()
    expect(item).toBe(1)
    expect(queue.length()).toBe(2)
  })
})