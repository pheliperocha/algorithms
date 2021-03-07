import { SinglyLinkedList } from './singlyLinkedList'

export class Queue<T = any> {
  private list: SinglyLinkedList<T>

  // O(n)
  constructor(...data: T[]) {
    this.list = new SinglyLinkedList(...data)
  }

  // O(1)
  length(): number {
    return this.list.length()
  }

  // O(1)
  enqueue(data: T): number {
    return this.list.push(data)
  }

  // O(1)
  dequeue(): T | undefined {
    return this.list.shift()!.get()
  }

  // O(1)
  peek(): T | undefined {
    return this.list.getFirst().get()
  }
}
