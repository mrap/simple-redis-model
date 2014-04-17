var redis = require('redis'),
    client = redis.createClient();

client.on("error", function(err){
  console.error(err);
});

