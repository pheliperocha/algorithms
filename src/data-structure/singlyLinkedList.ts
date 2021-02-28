class ListNode<T = any> {
  private data?: T
  private next?: ListNode<T>

  constructor(data: T) {
    this.data = data
  }

  get(): T | undefined {
    return this.data
  }

  set(data: T): void {
    this.data = data
  }

  getNext(): ListNode<T> | undefined {
    return this.next
  }

  setNext(node: ListNode<T> | undefined): void {
    this.next = node
  }

  hasNext(): boolean {
    return !!this.next
  }
}

class SinglyLinkedList<T = any> {
  private size: number = 0
  private head: ListNode = new ListNode(undefined)
  private tail: ListNode = this.head

  // O(n)
  constructor(...data: T[]) {
    for (const item of data) {
      this.push(item)
    }
  }

  // O(1)
  length(): number {
    return this.size
  }

  // O(n)
  [Symbol.iterator]() {
    let node: ListNode = this.head
    return {
      next: () => {
        const value = node.get()
        const next = node.getNext()
        node = (next) ? next : new ListNode(undefined)

        return {
          value: value,
          done: (value === undefined)
        }
      }
    }
  }

  // O(1)
  push(data: T): number {
    const newNode = new ListNode(data)

    if (this.head.get() === undefined) {
      this.head = this.tail = newNode
      return ++this.size
    }

    this.tail.setNext(newNode)
    this.tail = newNode
    return ++this.size
  }

  // O(1)
  unshift(data: T): number {
    const newNode = new ListNode(data)
    newNode.setNext(this.head)
    this.head = newNode
    return ++this.size
  }

  // O(1)
  getLast(): ListNode<T> {
    return this.tail
  }

  // O(1)
  getFirst(): ListNode<T> {
    return this.head
  }

  // O(n)
  getAt(index: number): ListNode<T> | undefined {
    let node: ListNode<T> | undefined = this.head
    let count = 0
    while (count < index && node) {
      node = node.getNext()
      count++
    }

    return (node) ? node : undefined
  }

  // O(1)
  clear() {
    this.head = this.tail = new ListNode(undefined)
    this.size = 0
  }

  // O(1)
  shift(): ListNode<T> | undefined {
    const firstItem = this.getFirst()
    this.head = firstItem.getNext() || new ListNode(undefined)
    this.size--
    return firstItem
  }

  // O(n)
  pop(): ListNode<T> | undefined {
    if (this.size <= 1) {
      const lastItem = this.head
      this.head = this.tail = new ListNode(undefined)
      this.size = 0
      return lastItem
    }

    const beforeLastItem = this.getAt(this.size - 2)
    if (!beforeLastItem) return undefined

    const lastItem = beforeLastItem.getNext()
    beforeLastItem.setNext(undefined)
    this.tail = beforeLastItem
    this.size--
    return (lastItem) ? lastItem : undefined
  }

  // O(n)
  insertAt(index: number, data: T): ListNode<T> | undefined {
    const newNode = new ListNode(data)
    if (index === 0) {
      this.size++
      return this.head = this.tail = newNode
    }
    
    const prevItem = this.getAt(index - 1)
    
    if (prevItem === undefined || !prevItem.getNext()) {
      return undefined
    }

    newNode.setNext(prevItem.getNext())
    prevItem.setNext(newNode)
    this.size++
    return newNode
  }

  // O(n)
  toString(separator: string = ', '): string {
    let node: ListNode | undefined = this.head
    
    let value = ''
    while (node) {
      value += (node.hasNext()) ? `${node.get()}${separator}` : node.get()
      node = node.getNext()
    }

    return value
  }
}

export {
  SinglyLinkedList
}