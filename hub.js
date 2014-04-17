  

var EMPTY_VERTEX = -1
var Hub = function Hub(verticiesCount, initialDistance){
  this.adj = new Array()
  for(var v = 0; v < verticiesCount; v++) this.adj[v] = initialDistance
}

Hub.prototype = {
  updateVertex: function updateVertex(vertex, distance){
    this.adj[vertex] = distance
  },

  deleteVertex: function deleteVertex(vertex) {
    this.adj[vertex] = EMPTY_VERTEX
  },

  size: function size(){
    return this.adj.length
  },

  contains: function contains(vertex){
    return (vertex >= 0 &&
            vertex < this.size() &&
            this.adj[vertex] != EMPTY_VERTEX)
  }
}

module.exports = Hub

