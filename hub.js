
var EMPTY_VERTEX = -1
var Hub = function Hub(uid, verticiesCount, initialDistance){
  this._adj = new Array()
  this._uid = uid
  for(var v = 0; v < verticiesCount; v++) this._adj[v] = initialDistance
}

Hub.prototype = {
  uid: function() {
    return this._uid
  },

  toString: function() {
    return this._uid
  },

  addVertex: function addVertex(vertex, distance){
    if (distance > 0) this._adj[vertex] = distance
  },

  updateVertex: function updateVertex(vertex, distance){
    if (distance > 0) this._adj[vertex] = distance
  },

  deleteVertex: function deleteVertex(vertex) {
    this._adj[vertex] = EMPTY_VERTEX
  },

  size: function size(){
    return this._adj.length
  },

  contains: function contains(vertex){
    return (vertex >= 0 &&
            vertex < this.size() &&
            this._adj[vertex] != EMPTY_VERTEX)
  }
}

module.exports = Hub

