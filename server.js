var redis = require('redis'),
    client = redis.createClient();

client.on("error", function(err){
  console.error(err);
});

var Graph = require('./graph.js')
var Hub = require('./hub.js')

var g = new Graph()
var hub = new Hub(5, 10)
g.addHub(hub)
console.log(g.size())
console.log(hub.size())

