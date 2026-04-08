// Weighted Graph

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex = function (name) {
    if (!this.adjacencyList[name]) this.adjacencyList[name] = [];
  };

  addEdge = function (v1, v2, weight) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1].push({ node: v2, weight });
      this.adjacencyList[v2].push({ node: v1, weight });
    } else {
      console.log("Invalid vertex");
    }
  };

  removeEdge = function (v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1] = this.adjacencyList[v1].filter(
        (v) => v.node !== v2
      );
      this.adjacencyList[v2] = this.adjacencyList[v2].filter(
        (v) => v.node !== v1
      );
    } else {
      console.log("Invalid vertex");
    }
  };

  removeVertex = function (vertex) {
    if (this.adjacencyList[vertex]) {
      for (let each of this.adjacencyList[vertex]) {
        this.removeEdge(vertex, each.node);
      }

      delete this.adjacencyList[vertex];
    } else {
      console.log("Invalid vertex");
    }
  };

  dfsRecursive = function (start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    (function dfs(v) {
      if (adjacencyList[v].length === 0) {
        return;
      }

      visited[v] = true;
      result.push(v);

      for (let neighbor of adjacencyList[v]) {
        if (!visited[neighbor]) {
          dfs(neighbor);
        }
      }
    })(start);

    return result;
  };

  dfsIterative = function (start) {
    const stack = [start];
    const result = [];
    const visited = {};

    while (stack.length > 0) {
      const vertex = stack.pop();

      if (!visited[vertex]) {
        visited[vertex] = true;
        result.push(vertex);
        stack.push(...this.adjacencyList[vertex]);
      }
    }
    return result;
  };

  bfs = function (start) {
    const queue = [start];
    const result = [];
    const visited = {};

    while (queue.length) {
      const vertex = queue.shift();

      if (!visited[vertex]) {
        result.push(vertex);
        visited[vertex] = true;
        queue.push(...this.adjacencyList[vertex]);
      }
    }

    return result;
  };

  //   shortestPath = function (start, end) {
  //     const queue = new NaivePriorityQueue();
  //     const distances = {};
  //     const previous = {};
  //     const path = [];

  //     for (let each of Object.keys(this.adjacencyList)) {
  //       if (each === start) {
  //         distances[each] = 0;
  //         queue.enqueue(each, 0);
  //       } else {
  //         distances[each] = Infinity;
  //         queue.enqueue(each, distances[each]);
  //       }
  //       previous[each] = null;
  //     }

  //     while (queue.values.length) {
  //       let smallest = queue.dequeue().val;

  //       if (smallest === end) {
  //         while (previous[smallest]) {
  //           path.push(smallest);
  //           smallest = previous[smallest];
  //         }
  //         break;
  //       }

  //       for (let neighbor of this.adjacencyList[smallest]) {
  //         const distanceCal = distances[smallest] + neighbor.weight;
  //         if (distanceCal < distances[neighbor.node]) {
  //           distances[neighbor.node] = distanceCal;
  //           previous[neighbor.node] = smallest;
  //           queue.enqueue(neighbor.node, distanceCal);
  //         }
  //       }
  //     }
  //     return path.concat(start).reverse();
  //   };

  Dijkstra(start, end) {
    const queue = new NaivePriorityQueue();
    const distances = {};
    const prev = {};
    const path = [];

    // Set up our initial
    for (let each of Object.keys(this.adjacencyList)) {
      if (each === start) {
        distances[each] = 0;
        queue.enqueue(each, 0);
      } else {
        distances[each] = Infinity;
        queue.enqueue(each, Infinity);
      }
      prev[each] = null;
    }

    while (queue.values.length) {
      let smallest = queue.values.shift().val;

      if (smallest === end) {
        // WE ARE DONE, NEED TO BUILD PATH
        while (prev[smallest]) {
          path.push(smallest);
          smallest = prev[smallest];
        }
        path.push(start);
        break;
      }

      for (let neighbor of this.adjacencyList[smallest]) {
        const indicate = distances[smallest] + neighbor.weight;
        if (indicate < distances[neighbor.node]) {
          distances[neighbor.node] = indicate;
          prev[neighbor.node] = smallest;
          queue.enqueue(neighbor.node, indicate);
        }
      }
    }

    return path.reverse();
  }
}

class NaivePriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue = function (val, priority) {
    this.values.push({ val, priority });
    this.sort();
  };

  dequeue = function () {
    return this.values.shift();
  };

  sort = function () {
    this.values.sort((a, b) => a.priority - b.priority);
  };
}

const g = new WeightedGraph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B", 4);
g.addEdge("A", "C", 2);
g.addEdge("B", "E", 3);
g.addEdge("C", "D", 2);
g.addEdge("C", "F", 4);
g.addEdge("D", "E", 3);
g.addEdge("D", "F", 1);
g.addEdge("E", "F", 1);

console.log(g.Dijkstra("A", "E"));
