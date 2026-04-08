// Undirected Graph

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex = function (name) {
    if (!this.adjacencyList[name]) this.adjacencyList[name] = [];
  };

  addEdge = function (v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1].push(v2);
      this.adjacencyList[v2].push(v1);
    } else {
      console.log("Invalid vertex");
    }
  };

  removeEdge = function (v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1] = this.adjacencyList[v1].filter((v) => v !== v2);
      this.adjacencyList[v2] = this.adjacencyList[v2].filter((v) => v !== v1);
    } else {
      console.log("Invalid vertex");
    }
  };

  removeVertex = function (vertex) {
    if (this.adjacencyList[vertex]) {
      for (let each of this.adjacencyList[vertex]) {
        this.removeEdge(vertex, each);
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
}

const g = new Graph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

// console.log(g.adjacencyList["A"]);

console.log(g.bfs("A"));
