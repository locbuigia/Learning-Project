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
}

const g = new Graph();

g.addVertex("Tokyo");
g.addVertex("Dallas");
g.addVertex("Aspen");

g.addEdge("Tokyo", "Dallas");
g.addEdge("Aspen", "Dallas");

g.removeVertex("Aspen");

console.log(g);
