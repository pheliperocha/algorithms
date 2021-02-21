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

  constructor(data: T | null = null) {
    if (data) {
      this.head = new ListNode(data)
      this.size++
    }
  }

  // O(n)
  push(data: T): number {
    const newNode = new ListNode(data)

    if (this.head.get() === undefined) {
      this.head = newNode
      this.size++
      return this.size
    }

    let currentNode = this.head
    while (currentNode && currentNode.next) {
      currentNode = currentNode.next
    }

    currentNode.next = newNode
    this.size++
    return this.size
  }

  // O(1)
  unshift(data: T): number {
    const newNode = new ListNode(data)
    newNode.next = this.head
    this.head = newNode
    this.size++
    return this.size
  }

  // O(n)
  getLast(): ListNode<T> {
    let node = this.head
    while (node && node.next) {
      node = node.next
    }
    return node
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

  // O(n)
  update(index: number, data: T): ListNode<T> | undefined {
    const node = this.getAt(index)
    if (!node) return undefined
    node.set(data)
    return node
  }

  // O(1)
  clear() {
    this.head = new ListNode(undefined)
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
      this.head = new ListNode(undefined)
      this.size = 0
    }

    const beforeLastItem = this.getAt(this.size - 2)
    if (!beforeLastItem) return undefined

    const lastItem = beforeLastItem.next
    beforeLastItem.next = null
    this.size--
    return (lastItem) ? lastItem : undefined
  }
}

export {
  SinglyLinkedList
}