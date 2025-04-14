import { Node } from "./node";

export interface ILinkedList<T> {
  insertFirst(value: T): Node<T>;
  insertLast(value: T): Node<T>;
  deleteNode(node: Node<T>): void;
  toArray(): T[];
  size(): number;
  search(comparator: (value: T) => boolean): Node<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;

  constructor(initial?: T) {
    if (initial) {
      this.head = new Node<T>(initial);
    }
  }

  private getLastNode<T>(node: Node<T>): Node<T> {
    return node.next ? this.getLastNode(node.next) : node;
  }

  public insertFirst(value: T): Node<T> {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }

    return node;
  }

  public insertLast(value: T): Node<T> {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
    } else {
      const lastNode = this.getLastNode(this.head);
      node.prev = lastNode;
      lastNode.next = node;
    }

    return node;
  }

  public deleteNode(node: Node<T>) {
    if (!node.prev) {
      this.head = node.next;
    } else {
      const prevNode = node.prev;
      prevNode.prev = node.next;
    }
  }

  public toArray(): T[] {
    const array: T[] = [];

    if (!this.head) {
      return array;
    }

    const addToArray = (node: Node<T>): T[] => {
      array.push(node.value);

      return node.next ? addToArray(node.next) : array;
    };

    return addToArray(this.head);
  }

  public size(): number {
    return this.toArray().length;
  }

  public search(comparator: (value: T) => boolean): Node<T> | null {
    const hasNext = (node: Node<T>): Node<T> | null => {
      if (comparator(node.value)) {
        return node;
      }

      return node.next ? hasNext(node.next) : null;
    };

    return this.head ? hasNext(this.head) : null;
  }
}
