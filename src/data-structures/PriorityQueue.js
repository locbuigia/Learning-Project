class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  getParent = function (index) {
    return Math.floor((index - 1) / 2);
  };

  getLeftChild = function (index) {
    return index * 2 + 1;
  };

  getRightChild = function (index) {
    return index * 2 + 2;
  };

  swap = function (index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  };

  enqueue = function (val, priority) {
    let newNode = new Node(val, priority);
    this.heap.push(newNode);
    this.heapifyUp();
  };

  heapifyUp = function () {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.heap[index].priority < this.heap[this.getParent(index)].priority
    ) {
      this.swap(index, this.getParent(index));
      index = this.getParent(index);
    }
  };

  dequeue = function () {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    let highestPriority = this.heap[0];
    this.heap[0] = this.heap.pop();

    this.bubbleDown();
    return highestPriority;
  };

  bubbleDown = function () {
    let index = 0;
    while (true) {
      let leftChildIndex = this.getLeftChild(index);
      let rightChildIndex = this.getRightChild(index);
      let smallest = index;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex].priority < this.heap[smallest].priority
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].priority < this.heap[smallest].priority
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === index) {
        break;
      }

      this.swap(index, smallest);
      index = smallest;
    }
  };
}

const myQueue = new PriorityQueue();

myQueue.enqueue("Pay bill", 4);
myQueue.enqueue("Walk dog", 5);
myQueue.enqueue("Go out", 6);
myQueue.enqueue("Do Test", 3);

console.log(myQueue.dequeue());

console.log(myQueue);
