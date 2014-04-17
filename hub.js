  
var Hub = function Hub(verticiesCount, initialDistance){
  this.adj = new Array()
  for(var v = 0; v < verticiesCount; v++) this.adj[v] = initialDistance
}

Hub.prototype = {
  updateVertex: function updateVertex(vertex, distance){
    this.adj[vertex] = distance
  },
  size: function size(){
    return this.adj.length
  }
}

module.exports = Hub

