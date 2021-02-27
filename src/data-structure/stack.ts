import { SinglyLinkedList } from './singlyLinkedList'

export class Stack<T> {
  private list: SinglyLinkedList<T>

  constructor(list: SinglyLinkedList<T> = new SinglyLinkedList()){
    this.list = list
  }

  // O(1)
  length(): number {
    return this.list.length()
  }

  push() {}
  pop() {}
  peek() {}
}