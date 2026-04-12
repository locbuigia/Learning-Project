class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (this.head === null) return undefined;
    let prev = this.head;
    let current = this.head;

    while (current.next) {
      prev = current;
      current = current.next;
    }

    this.tail = prev;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift() {
    if (this.head === null) return undefined;

    let current = this.head;
    this.head = current.next;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  unshift(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  set(index, val) {
    let foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = val;
    } else {
      return undefined;
    }

    return this;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) return undefined;
    if (index === 0) {
      this.unshift(val);
      return this;
    }
    if (index === this.length) {
      this.push(val);
      return this;
    }

    let prev = this.get(index - 1);
    let newNode = new Node(val);
    let temp = prev.next;
    prev.next = newNode;
    newNode.next = temp;
    this.length++;

    return this;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;

    if (index === 0) {
      let removeNode = this.get(index);
      this.shift();
      return removeNode;
    }
    if (index === this.length - 1) {
      let removeNode = this.get(index);
      this.pop();
      return removeNode;
    }
    let prev = this.get(index - 1);
    let removeNode = prev.next;
    prev.next = removeNode.next;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return removeNode;
  }

  reverse() {
    if (this.length === 0) return undefined;
    if (this.length === 1) return this;

    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    let next = null;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    return this;
  }

  print() {
    let arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
}

let list = new SinglyLinkedList();
list.push("hello");
list.push("world");

list.unshift("Loc");

console.log(list.remove(1));
