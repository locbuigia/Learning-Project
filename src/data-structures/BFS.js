// BFS - Steps to implement BFS
// 1. Create a queue (can be an array) and a list to store the values of nodes visited
// 2. Place the root node in the queue
// 3. Loop as long as there is anything in the queue
//   a. Dequeue a node from the queue and add its value to the list of values
//   b. If the node has a left child, add the left child to the queue
//   c. If the node has a right child, add the right child to the queue
// 4. Return the list of values

function bfs(root) {
  if (!root) return []; // If the tree is empty, return an empty array

  const queue = [root]; // Initialize the queue with the root node
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
