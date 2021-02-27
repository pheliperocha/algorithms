import { SinglyLinkedList } from './singlyLinkedList'

export class Queue<T = any> {
  private list: SinglyLinkedList<T>

  constructor(...data: T[]) {
    this.list = new SinglyLinkedList(...data)
  }

  // O(1)
  length(): number {
    return this.list.length()
  }

  enqueue(data: T): number {
    return this.list.push(data)
  }

  dequeue() { }
  peek() {}
}