import { ListNode, type IListNode } from "./node";

interface ILinkedList<T> {
  size: number;

  insertFirst(value: T): IListNode<T>;

  insertLast(value: T): IListNode<T>;

  remove(node: IListNode<T> | null): boolean;

  toArray(): T[];

  joinToString(separator?: string): string;

  getByValue(value: T): IListNode<T> | null;

  find(cb: (value: T) => boolean): IListNode<T> | null;

  indexOf(index: number): IListNode<T> | null;

  traverse(cb?: (node: IListNode<T> | null) => void): void;

  replace(searchValue: T, replaceValue: T): IListNode<T> | null;

  values(): IterableIterator<T>;
}

export class LinkedList<T> implements ILinkedList<T> {
  protected head: IListNode<T> | null = null;
  protected tail: IListNode<T> | null = null;
  protected _size: number = 0;

  public constructor(...initial: T[]) {
    if (!initial || !initial.length) return;

    for (const value of initial) {
      this.insertLast(value);
    }
  }

  public get size(): number {
    return this._size;
  }

  public get first(): T | null {
    return this.head?.value ?? null;
  }

  public get last(): T | null {
    return this.tail?.value ?? null;
  }

  public insertFirst(value: T): IListNode<T> {
    const node = new ListNode(value);

    node.next = this.head;
    this.head = node;
    this._size += 1;

    return node;
  }

  public insertLast(value: T): IListNode<T> {
    const node = new ListNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this._size += 1;

    return node;
  }

  public remove(node: IListNode<T> | null): boolean {
    if (!this.head || !node) return false;

    if (this.head === node) {
      this.head = this.head.next;

      if (!this.head) {
        this.tail = null;
      }

      node.next = null;
      this._size -= 1;

      return true;
    }

    let currentNode: IListNode<T> | null = this.head;

    while (currentNode?.next && currentNode.next !== node) {
      currentNode = currentNode.next;
    }

    if (!currentNode.next) return false;

    const nodeToRemove = currentNode.next;

    currentNode.next = currentNode.next.next;

    nodeToRemove.next = null;
    this._size -= 1;
    return true;
  }

  public traverse(cb?: (node: IListNode<T> | null) => void) {
    let node = this.head;

    while (node) {
      if (cb) cb(node);
      node = node.next;
    }
  }

  public toArray(): T[] {
    const array: T[] = [];

    if (!this.head) return array;

    let node: IListNode<T> | null = this.head;

    while (node) {
      array.push(node.value);

      node = node.next;
    }

    return array;
  }

  public joinToString(separator: string = ","): string {
    if (!this.head) return "";

    let joinedString = String(this.head.value);
    let node: IListNode<T> | null = this.head.next;

    while (node) {
      joinedString += separator + String(node.value);
      node = node.next;
    }

    return joinedString;
  }

  public getByValue(value: T): IListNode<T> | null {
    if (!this.head) return null;

    let node: IListNode<T> | null = this.head;

    while (node) {
      if (node.value === value) return node;

      node = node.next;
    }

    return null;
  }

  public find(cb: (value: T) => boolean): IListNode<T> | null {
    if (!this.head) return null;

    let node: IListNode<T> | null = this.head;

    while (node) {
      if (cb(node.value)) return node;

      node = node.next;
    }

    return null;
  }

  public indexOf(index: number): IListNode<T> | null {
    if (!this.head || index < 0 || index >= this._size) return null;

    if (index === 0) return this.head;
    if (index === this._size - 1) return this.tail;

    let currentIndex: number = 0;
    let node: IListNode<T> | null = this.head;

    while (node) {
      if (currentIndex === index) {
        return node;
      }

      node = node.next;
      currentIndex += 1;
    }

    return null;
  }

  public replace(searchValue: T, replaceValue: T): IListNode<T> | null {
    let node: ListNode<T> | null = this.head;

    while (node) {
      if (node.value === searchValue) {
        node.value = replaceValue;
        break;
      }

      node = node.next;
    }

    return node;
  }

  [Symbol.iterator](): Iterator<IListNode<T>> {
    let current = this.head;
    return {
      next(): IteratorResult<IListNode<T>> {
        if (current) {
          const node = current;
          current = node.next;
          return { value: node, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }

  public *values(): IterableIterator<T> {
    let node = this.head;

    while (node) {
      yield node.value;
      node = node.next;
    }
  }
}
