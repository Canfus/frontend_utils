import { LinkedList } from "../src/linked-list";

describe("Create linked list with initial values", () => {
  it("should create linked list with initial string values correctly", () => {
    const initialValues: Array<string> = ["A", "B", "C"];

    const list = new LinkedList(...initialValues);

    expect(list.toArray()).toStrictEqual(initialValues);
    expect(list.size).toStrictEqual(3);
  });

  it("should save values at start of linked list correctly", () => {
    const list = new LinkedList<string>();
    list.insertFirst("A");
    list.insertFirst("B");

    expect(list.toArray()).toStrictEqual(["B", "A"]);
    expect(list.size).toStrictEqual(2);
  });

  it("should save values at end of linked list correctly", () => {
    const list = new LinkedList<string>();
    list.insertLast("A");
    list.insertLast("B");

    expect(list.toArray()).toStrictEqual(["A", "B"]);
  });

  it("should replace value correctly", () => {
    const list = new LinkedList<string>();
    list.insertLast("A");
    list.insertLast("B");

    list.replace("B", "C");

    expect(list.toArray()).toStrictEqual(["A", "C"]);
  });

  it("should remove node from linked list correctly", () => {
    const list = new LinkedList<string>();
    list.insertLast("A");
    list.insertLast("B");

    const removeNode = list.getByValue("B");

    list.remove(removeNode);

    expect(list.toArray()).toStrictEqual(["A"]);
  });

  it("should find node correctly", () => {
    const list = new LinkedList<string>();
    list.insertLast("A");
    list.insertLast("B");

    const foundNode = list.find((value) => value === "B");

    expect(foundNode?.value).toStrictEqual("B");
  });

  it("should find node by index correctly", () => {
    const list = new LinkedList<string>();
    list.insertLast("A");
    list.insertLast("B");

    const foundNode = list.indexOf(1);

    expect(foundNode?.value).toStrictEqual("B");
  });

  it("should join linked list to string correctly", () => {
    const list = new LinkedList<string>();
    list.insertLast("A");
    list.insertLast("B");

    const joinedString = list.joinToString();

    expect(joinedString).toStrictEqual("A,B");
  });
});
