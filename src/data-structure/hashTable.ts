import { SinglyLinkedList } from './singlyLinkedList'

type INode<T> = { key: string, data: T }
type IBucket<T> = SinglyLinkedList<INode<T>>

export class HashTable<T> {
  private bucket: IBucket<T>[]
  private bucketSize: number
  private _length: number

  constructor(bucketSize: number = 512) {
    this.bucket = new Array<IBucket<T>>(bucketSize)
    this.bucketSize = bucketSize
    this._length = 0
  }

  private hash(key: string, primer: number = 71): number {
    const m = 1e9 + 9
    let hashValue = 0
    let powerOfP = primer

    for (const c of key) {
      hashValue = (hashValue + (c.charCodeAt(0) * powerOfP)) % this.bucketSize
      powerOfP = (powerOfP * primer) % m
    }

    return hashValue
  }

  // O(1)
  get length(): number {
    return this._length
  }

  // O(1)
  add(key: string, data: T): number {
    const hash = this.hash(key)

    if (!this.bucket[hash]) {
      this.bucket[hash] = new SinglyLinkedList<INode<T>>({ key, data })
      return ++this._length
    }

    const nodeFilled = this.bucket[hash].find(node => node.key === key)

    if (nodeFilled) {
      nodeFilled.set({ key, data })
      return this._length
    }

    this.bucket[hash].push({ key, data })
    return ++this._length
  }

  // O(1)
  get(key: string): T | undefined {
    const hash = this.hash(key)

    if (!this.bucket[hash]) {
      return undefined
    }

    const result = this.bucket[hash].find(node => node.key === key)
    return result?.get()?.data
  }

  remove() {}
}
