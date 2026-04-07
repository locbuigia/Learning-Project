function MaxHeap() {
  this.heap = [];

  //Get parent index
  this.getParentIndex = function (index) {
    return Math.floor((index - 1) / 2);
  };

  //Get left child index
  this.getLeftChildIndex = function (index) {
    return index * 2 + 1;
  };

  //Get right child index
  this.getRightChildIndex = function (index) {
    return index * 2 + 2;
  };

  //Swap elements in the heap
  this.swap = function (index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  };

  //Insert a new value into the heap
  this.insert = function (value) {
    //Add the new value to the end of the heap
    this.heap.push(value);
    //Heapify up to maintain the max-heap property
    this.heapifyUp();
  };

  //Heapify up to maintain the min-heap property
  this.heapifyUp = function () {
    let index = this.heap.length - 1; // Start from the last inserted element

    // Continue while the index is not the root and the current element is bigger than its parent
    while (
      index > 0 &&
      this.heap[index] > this.heap[this.getParentIndex(index)]
    ) {
      // Swap the current element with its parent
      this.swap(index, this.getParentIndex(index));

      // Move index to parent index
      index = this.getParentIndex(index);
    }
  };

  this.remove = function () {
    if (this.heap.length === 1) {
      return this.heap.pop(); // Remove and return the only element
    }

    const max = this.heap[0]; // Store the max element (root)
    this.heap[0] = this.heap.pop(); // Move the last element to the root

    // Heapify down to maintain the max-heap property
    this.heapifyDown();

    return max; // Return the max element
  };

  this.heapifyDown = function () {
    let index = 0; // Start from the root

    while (true) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      let biggesIndex = index;

      // Check if left child exists and is bigger than the current smallest
      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] > this.heap[biggesIndex]
      ) {
        biggesIndex = leftChildIndex;
      }

      // Check if right child exists and is bigger than the current smallest
      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] > this.heap[biggesIndex]
      ) {
        biggesIndex = rightChildIndex;
      }

      // If the biggest index is still the current index, the heap property is satisfied
      if (biggesIndex === index) {
        break;
      }

      this.swap(index, biggesIndex); // Swap the current element with the smallest element
      index = biggesIndex; // Move index to the smallest index
    }
  };

  this.peek = function () {
    return this.heap[0]; // Return the maximum element (root)
  };
}

const testArr = [5, 2, 8, 1, 10, 24, 52, 75, 86, 12, 90, 100];

const heap = new MaxHeap();

testArr.forEach((num) => heap.insert(num));

// Find the top 3 largest elements, k = 3;

const k = 5;
let topKElement;

for (let i = 0; i < k; i++) {
  topKElement = heap.remove();
}

console.log(topKElement);
