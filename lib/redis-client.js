var redis  = require('redis'),
    client = redis.createClient()

client.on("error", function(err){
  if (err) throw err
})

module.exports = client
