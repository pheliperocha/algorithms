import { Queue } from './queue'

describe('Constructor and lenght', () => {
  it('Create a empty queue', () => {
    const queue = new Queue()
    expect(queue.length()).toBe(0)
  })

  it('Create queue with one item', () => {
    const queue = new Queue('value')
    expect(queue.length()).toBe(1)
  })

  it('Create queue with 5 item', () => {
    const queue = new Queue(9, 8, 7, 6, 5)
    expect(queue.length()).toBe(5)
  })
})