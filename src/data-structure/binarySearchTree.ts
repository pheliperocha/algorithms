class Leaf<T> {
  private data: T
  private _parent: Leaf<T> | undefined
  private _left: Leaf<T> | undefined
  private _right: Leaf<T> | undefined

  constructor(data: T, parent?: Leaf<T>, left?: Leaf<T>, right?: Leaf<T>) {
    this.data = data
    this._parent = parent
    this._left = left
    this._right = right
  }

  get() {
    return this.data
  }

  set(data: T) {
    this.data = data
  }

  get parent(): Leaf<T> | undefined {
    return this._parent
  }

  set parent(node: Leaf<T> | undefined) {
    this._parent = node
  }

  get left(): Leaf<T> | undefined {
    return this._left
  }

  set left(node: Leaf<T> | undefined) {
    this._left = node
  }

  get right(): Leaf<T> | undefined {
    return this._right
  }

  set right(node: Leaf<T> | undefined) {
    this._right = node
  }
}

export interface CompareFn<T> {
  (valueA: Partial<T>, valueB: Partial<T>): number
}

export class BinarySearchTree<T> {
  private _root: Leaf<T> | undefined = undefined
  private _lenght: number = 0

  private compareFn: CompareFn<T> = <T>(valueA: T, valueB: T): number => {
    if (valueA > valueB) return 1
    if (valueA < valueB) return -1
    return 0
  }

  constructor(compareFn?: CompareFn<T>) {
    if (compareFn) this.compareFn = compareFn
  }

  get lenght() {
    return this._lenght
  }

  get root() {
    return this._root
  }

  private insertOnLeaf(
    leaf: Leaf<T> | undefined,
    data: T,
    parent?: Leaf<T>,
  ): Leaf<T> {
    if (!leaf) {
      return new Leaf(data, parent)
    }

    if (this.compareFn(leaf.get(), data) > 0) {
      leaf.left = this.insertOnLeaf(leaf.left, data, leaf)
    } else {
      leaf.right = this.insertOnLeaf(leaf.right, data, leaf)
    }

    return leaf
  }

  insert(...data: T[]): number {
    for (const value of data) {
      this._root = this.insertOnLeaf(this._root, value)
      this._lenght++
    }
    return this._lenght
  }

  find(data: Partial<T>): Leaf<T> | undefined {
    let leaf = this._root
    while(leaf) {
      if (this.compareFn(leaf.get(), data) === 0) return leaf
      if (this.compareFn(leaf.get(), data) > 0) {
        leaf = leaf.left
      } else {
        leaf = leaf.right
      }
    }
    return undefined
  }

  delete() {}
}
