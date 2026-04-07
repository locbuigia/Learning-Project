class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    // Insertion logic for the binary search tree
    let newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root;

      while (true) {
        if (value < current.value) {
          if (current.left === null) {
            current.left = newNode;
            return this;
          }
          current = current.left;
        } else if (value > current.value) {
          if (current.right === null) {
            current.right = newNode;
            return this;
          }
          current = current.right;
        } else {
          console.log(
            "Value already exists in the tree, do not insert duplicates"
          );
          return this; // Value already exists in the tree, do not insert duplicates
        }
      }
    }
  }

  remove(value) {
    if (this.root === null) {
      return undefined;
    } else {
      let current = this.root;
      let parent = this.root;
      while (true) {
        if (value < current.value) {
          if (current.left === null) {
            return undefined;
          }
          parent = current;
          current = current.left;
        } else if (value > current.value) {
          if (current.right === null) {
            return undefined;
          }
          parent = current;
          current = current.right;
        } else {
          if (current.left === null && current.right === null) {
            parent.value < value ? (parent.right = null) : (parent.left = null);
          } else if (current.left === null) {
            parent.value < value
              ? (parent.right = current.right)
              : (parent.left = current.right);
          } else if (current.right === null) {
            parent.value < value
              ? (parent.right = current.left)
              : (parent.left = current.left);
          } else {
            console.log("Node has two children");
            let successorParent = current;
            let successor = current.right;

            while (successor.left !== null) {
              successorParent = successor;
              successor = successor.left;
            }

            // Replace current value with successor value
            current.value = successor.value;

            // Delete successor node
            if (successorParent.left === successor) {
              successorParent.left = successor.right;
            } else {
              successorParent.right = successor.right;
            }
          }
          return current;
        }
      }
    }
  }

  find(value) {
    // Search logic for the binary search tree
    if (this.root === null) {
      return undefined; // Tree is empty, value not found
    }

    if (this.root.value === value) {
      return this.root;
    } else {
      let current = this.root;
      while (true) {
        if (value < current.value) {
          if (current.left === null) {
            return undefined;
          }
          current = current.left;
        } else if (value > current.value) {
          if (current.right === null) {
            return undefined;
          }
          current = current.right;
        } else {
          return current; // Value found
        }
      }
    }
  }

  findSecondLargest() {
    if (
      this.root === null ||
      (this.root.left === null && this.root.right === null)
    ) {
      return undefined; // Not enough nodes
    }

    let current = this.root;

    while (current !== null) {
      // Current is largest AND has left subtree
      if (current.right === null && current.left !== null) {
        return this.findLargest(current.left);
      }

      // Current is parent of largest, and largest has no children
      if (
        current.right !== null &&
        current.right.left === null &&
        current.right.right === null
      ) {
        return current.value;
      }

      current = current.right;
    }
  }

  findLargest(node) {
    let current = node || this.root;
    if (current === null) {
      return undefined;
    } else {
      while (current.right !== null) {
        current = current.right;
      }
      return current.value;
    }
  }

  // Which to use? Time complexity is the same, but space complexity is different
  // - BFS uses a queue and can require more memory if the tree is wide, while DFS uses a stack (or recursion) and can require more memory if the tree is deep.
  // - BFS is better for finding the shortest path in an unweighted graph, or when the target node is likely to be found near the root.
  // - DFS is better for exploring all possible paths in a graph, or when the target node is likely to be found far from the root.

  // Which DFS to use? Time complexity is the same, but space complexity is different
  // - Pre-order DFS is useful for copying a tree, or when you want to process the parent node before its children.
  // - Post-order DFS is useful for deleting a tree, or when you want to process the children nodes before their parent.
  // - In-order DFS is useful for retrieving the values of a binary search tree in sorted order, or when you want to process the left child before the parent and the right child after the parent.

  bfs() {
    // BFS - Steps to implement BFS
    // 1. Create a queue (can be an array) and a list to store the values of nodes visited
    // 2. Place the root node in the queue
    // 3. Loop as long as there is anything in the queue
    //   a. Dequeue a node from the queue and add its value to the list of values
    //   b. If the node has a left child, add the left child to the queue
    //   c. If the node has a right child, add the right child to the queue
    // 4. Return the list of values
    // -------------------------------------------------------------------------------------

    const queue = [this.root]; // Initialize the queue with the root node
    const visited = []; // List to store the values of visited nodes

    while (queue.length > 0) {
      const currentNode = queue.shift();
      visited.push(currentNode.value); // Add the value of the current node to the visited list

      if (currentNode.left) {
        queue.push(currentNode.left); // Add left child to the queue if it exists
      }

      if (currentNode.right) {
        queue.push(currentNode.right); // Add right child to the queue if it exists
      }
    }

    return visited; // Return the list of visited node values
  }

  preOrderDFS() {
    // Pre-order DFS - Steps to implement pre-order DFS - Recursive
    // 1. Create a list to store the values of nodes visited
    // 2. Store the root of the BST in a variable called current
    // 3. Write a helper function which accepts a node
    //   a. Push the value of the node to the list of values
    //   b. If the node has a left child, call the helper function with the left child
    //   c. If the node has a right child, call the helper function with the right child
    // 4. Call the helper function with the current variable
    // 5. Return the list of values

    const visited = []; // List to store the values of visited nodes
    let current = this.root; // Store the root of the BST in a variable called current

    function traverse(node) {
      visited.push(node.value); // Push the value of the node to the list of values
      node.left && traverse(node.left); // If the node has a left child, call the helper function with the left child
      node.right && traverse(node.right); // If the node has a right child, call the helper function with the right child
    }

    traverse(current); // Call the helper function with the current variable
    return visited; // Return the list of values
  }

  postOrderDFS() {
    // Post-order DFS - Steps to implement post-order DFS - Recursive
    // 1. Create a list to store the values of nodes visited
    // 2. Store the root of the BST in a variable called current
    // 3. Write a helper function which accepts a node
    //   a. If the node has a left child, call the helper function with the left child
    //   b. If the node has a right child, call the helper function with the right child
    //   c. Push the value of the node to the list of values
    // 4. Call the helper function with the current variable
    // 5. Return the list of values

    const visited = []; // List to store the values of visited nodes
    let current = this.root; // Store the root of the BST in a variable called current

    function traverse(node) {
      node.left && traverse(node.left); // If the node has a left child, call the helper function with the left child
      node.right && traverse(node.right); // If the node has a right child, call the helper function with the right child
      visited.push(node.value); // Push the value of the node to the list of values
    }

    traverse(current); // Call the helper function with the current variable
    return visited; // Return the list of values
  }

  inOrderDFS() {
    // In-order DFS - Steps to implement in-order DFS - Recursive
    // 1. Create a list to store the values of nodes visited
    // 2. Store the root of the BST in a variable called current
    // 3. Write a helper function which accepts a node
    //   a. If the node has a left child, call the helper function with the left child
    //   b. Push the value of the node to the list of values
    //   c. If the node has a right child, call the helper function with the right child
    // 4. Call the helper function with the current variable
    // 5. Return the list of values

    const visited = []; // List to store the values of visited nodes
    let current = this.root; // Store the root of the BST in a variable called current

    function traverse(node) {
      node.left && traverse(node.left); // If the node has a left child, call the helper function with the left child
      visited.push(node.value); // Push the value of the node to the list of values
      node.right && traverse(node.right); // If the node has a right child, call the helper function with the right child
    }

    traverse(current); // Call the helper function with the current variable
    return visited; // Return the list of values
  }
}

let binarySearchTree = new BST();
binarySearchTree.insert(10);
binarySearchTree.insert(6);
binarySearchTree.insert(15);
binarySearchTree.insert(3);
binarySearchTree.insert(8);
binarySearchTree.insert(20);

console.log(binarySearchTree.inOrderDFS());
