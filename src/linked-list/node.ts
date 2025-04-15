export interface IListNode<T> {
  next: IListNode<T> | null;
  value: T;
}

export class ListNode<T> implements IListNode<T> {
  public next: ListNode<T> | null = null;

  constructor(public value: T) {}
}
