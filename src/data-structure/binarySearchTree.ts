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
    while (leaf) {
      if (this.compareFn(leaf.get(), data) === 0) return leaf
      if (this.compareFn(leaf.get(), data) > 0) {
        leaf = leaf.left
      } else {
        leaf = leaf.right
      }
    }
    return undefined
  }

  private minLeaf(leaf: Leaf<T>) {
    let currentLeaf = leaf
    while (currentLeaf && currentLeaf.left !== undefined) currentLeaf = currentLeaf.left
    return currentLeaf
  }

  private deleteLeaf(leaf: Leaf<T>, data: Partial<T>): Leaf<T> | undefined {
    if (leaf.left && this.compareFn(data, leaf.get()) < 0) {
      leaf.left = this.deleteLeaf(leaf.left, data)
    }

    if (leaf.right && this.compareFn(data, leaf.get()) > 0) {
      leaf.right = this.deleteLeaf(leaf.right, data)
    }

    if (this.compareFn(data, leaf.get()) === 0) {
      this._lenght--

      if (leaf.left === undefined) {
        return leaf.right
      } else if (leaf.right === undefined) {
        return leaf.left
      }

      const temp = this.minLeaf(leaf.right)
      temp.left = leaf.left
      leaf = temp
      leaf.right = (leaf.right) ? this.deleteLeaf(leaf.right, data) : undefined
    }

    return leaf
  }

  delete(data: Partial<T>): boolean {
    if (!this._root) return false
    const currentLenght = this._lenght
    this.deleteLeaf(this._root, data)
    return (this._lenght < currentLenght) ? true : false
  }
}
