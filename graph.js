
var Hub = require('./hub.js')

var Graph = function Graph(){
  this.hubs = new Array()
}

Graph.prototype = {
  addHub: function addHub(hub){
    if (hub instanceof Hub) this.hubs.push(hub)
  },
  size: function size(){
    return this.hubs.length
  }

}

module.exports = Graph
