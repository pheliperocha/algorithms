import { SinglyLinkedList } from './singlyLinkedList'

export class Queue<T = any> {
  private list: SinglyLinkedList<T>

  // O(n)
  constructor(...data: T[]) {
    this.list = new SinglyLinkedList(...data.reverse())
  }

  // O(1)
  length(): number {
    return this.list.length()
  }

  enqueue(data: T): number {
    return this.list.push(data)
  }

  dequeue(): T | undefined {
    return this.list.pop()!.get()
  }

  peek() {}
}