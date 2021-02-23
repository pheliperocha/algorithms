class ListNode<T = any> {
  private data: T | null = null
  next: ListNode<T> | null = null

  constructor(data: T) {
    this.data = data
  }

  get(): T | null {
    return this.data
  }

  set(data: T): void {
    this.data = data
  }
}

class SinglyLinkedList<T = any> {
  size: number = 0
  private head: ListNode = new ListNode(undefined)
  private tail: ListNode = this.head

  constructor(data: T | null = null) {
    if (data) {
      this.head = this.tail = new ListNode(data)
      this.size++
    }
  }

  // O(1)
  push(data: T): number {
    const newNode = new ListNode(data)

    if (this.head.get() === undefined) {
      this.head = this.tail = newNode
      return ++this.size
    }

    this.tail.next = newNode
    this.tail = newNode
    return ++this.size
  }

  // O(1)
  unshift(data: T): number {
    const newNode = new ListNode(data)
    newNode.next = this.head
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
    let node: ListNode<T> | null = this.head
    let count = 0
    while (count < index && node) {
      node = node.next
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
    this.head = (firstItem.next) ? firstItem.next : new ListNode(undefined)
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

    const lastItem = beforeLastItem.next
    beforeLastItem.next = null
    this.tail = beforeLastItem
    this.size--
    return (lastItem) ? lastItem : undefined
  }

  insertAt(index: number, data: T): ListNode<T> | undefined {
    const newNode = new ListNode(data)
    if (index === 0) {
      this.size++
      return this.head = this.tail = newNode
    }
    
    const prevItem = this.getAt(index - 1)
    
    if (prevItem === undefined || !prevItem.next) {
      return undefined
    }

    newNode.next = prevItem.next
    prevItem.next = newNode
    this.size++
    return newNode
  }
}

export {
  SinglyLinkedList
}