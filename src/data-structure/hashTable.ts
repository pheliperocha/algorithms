import { SinglyLinkedList } from './singlyLinkedList'

type INode<T> = { key: string; data: T }
type IBucket<T> = SinglyLinkedList<INode<T>>

export class HashTable<T> {
  private _bucketList: IBucket<T>[]
  private _capacity: number
  private _length: number
  private _loadFactor: number
  private _automaticallyResize: boolean

  constructor(
    capacity?: number | null,
    loadFactor?: number | null,
    automaticallyResize: boolean = true,
  ) {
    this._capacity = capacity || 541
    this._bucketList = new Array<IBucket<T>>(this._capacity)
    this._loadFactor =
      loadFactor && loadFactor >= 0.3 && loadFactor <= 1 ? loadFactor : 0.75
    this._length = 0
    this._automaticallyResize = automaticallyResize
  }

  // Polynomial rolling hash
  hash(key: string, primer: number = 1039): number {
    const m = 1e9 + 9
    let hashValue = 0
    let powerOfP = primer

    for (const c of key) {
      hashValue = (hashValue + c.charCodeAt(0) * powerOfP) % this._capacity
      powerOfP = (powerOfP * primer) % m
    }

    return hashValue
  }

  // O(1)
  private shouldResize(): boolean {
    return this._length / this._capacity >= this.loadFactor
  }

  // O(1)
  get loadFactor() {
    return this._loadFactor
  }

  // O(1)
  set loadFactor(loadFactor: number) {
    if (loadFactor < 0.3) throw new Error('LoadFactor too low')
    if (loadFactor > 1) throw new Error('LoadFactor too high')
    this._loadFactor = loadFactor
  }

  // O(1)
  get capacity() {
    return this._capacity
  }

  // O(n)
  resize(bucketListSize: number): void {
    // Store the current bucketList into a temp variable
    const tempBucketList = this._bucketList

    // Create new empty bucketList with the new size and set as the bucketList of the Hashtable
    this._bucketList = new Array<IBucket<T>>(bucketListSize)
    this._capacity = bucketListSize
    // Set the _lenght to 0
    this._length = 0

    // Iterate over all stored items on the temp variable
    for (const bucket of tempBucketList) {
      // Add the item to the new bucketList
      bucket?.forEach(({ key, data }) => this.add(key, data))
    }
  }

  // O(1)
  get length(): number {
    return this._length
  }

  // O(1)
  add(key: string, data: T): number {
    if (this._automaticallyResize && this.shouldResize()) {
      this.resize(this._capacity * 2)
    }

    const hash = this.hash(key)

    if (!this._bucketList[hash]) {
      this._bucketList[hash] = new SinglyLinkedList<INode<T>>({ key, data })
      return ++this._length
    }

    const nodeFilled = this._bucketList[hash].find((node) => node.key === key)

    if (nodeFilled) {
      nodeFilled.set({ key, data })
      return this._length
    }

    this._bucketList[hash].push({ key, data })
    ++this._length

    return this._length
  }

  // O(1)
  get(key: string): T | undefined {
    const hash = this.hash(key)

    if (!this._bucketList[hash]) return undefined

    const result = this._bucketList[hash].find((node) => node.key === key)
    return result?.get()?.data
  }

  // O(1)
  remove(key: string): boolean {
    const hash = this.hash(key)

    if (!this._bucketList[hash]) return false

    const currentSize = this._bucketList[hash].length()
    const newSize = this._bucketList[hash].delete((value) => value.key === key)
    const changed = currentSize - newSize !== 0
    if (changed) --this._length
    return changed
  }
}
