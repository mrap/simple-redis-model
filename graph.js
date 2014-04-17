
var Hub = require('./hub.js')

var Graph = function Graph(){
  this._hubs = new Object()
}

Graph.prototype = {

  addHub: function addHub(hub){
    if (hub instanceof Hub && !this.containsHub(hub))
      this._hubs[hub.uid()] = hub
  },

  size: function size(){
    var count = 0
    for(elem in this._hubs) count++
    return count
  },

  containsHub: function containsHub(hub) {
    return this.containsHubWithID(hub.uid())
  },

  containsHubWithID: function containsHubWithID(hubUID) {
    return this._hubs.hasOwnProperty(hubUID)
  }

}

module.exports = Graph
