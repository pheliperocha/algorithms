import { SinglyLinkedList } from './singlyLinkedList'

export class Stack<T = any> {
  private list: SinglyLinkedList<T>

  // O(n)
  constructor(...data: T[]){
    this.list = new SinglyLinkedList(...data.reverse())
  }

  // O(1)
  length(): number {
    return this.list.length()
  }

  // O(1)
  push(data: T): number {
    return this.list.unshift(data)
  }

  // O(1)
  pop(): T | undefined {
    return this.list.shift()!.get()
  }

  // O(1)
  peek(): T | undefined {
    return this.list.getFirst()!.get()
  }
}