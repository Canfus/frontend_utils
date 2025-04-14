export class Node<T> {
  public prev: Node<T> | null = null;
  public next: Node<T> | null = null;

  constructor(public value: T) {}
}
