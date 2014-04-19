var redisServer = require('redis'),
    redis = redisServer.createClient()

redis.on("error", function(err){
  console.error(err)
})

String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// params:
// modelName: string describing the Model's name
// attrs: array of attribute names
var DBModel = function DBModel(modelName, attrs){
  this.modelName = modelName
  this.attrs = attrs
  return this
}

DBModel.prototype = {
  new: function(attrs){
    var obj = new Object()
    obj.id
    for(var a in this.attrs) obj[a]
    for(var a in attrs) obj[a] = attrs[a]
    return obj
  },

  // Database Operations
  nextIdKey:          function() { return "next" + this.modelName + "" },
  idKey:              function(id) { return this.modelName + "_" + "id:" + id },
  idKeyForAttribute:  function(id, attr) { return this.idKey(id) + ":" + attr },
  modelCollectionKey: function(){ return this.modelName + "_ids" },

  save: function(obj, callback){
    var model = this
    redis.incr(model.nextIdKey(), function(err, nextId){
      obj.id = model.idKey(nextId)
      if (err) throw err
      redis.multi()
      .HMSET(model.idKey(obj.id), obj)
      .sadd(model.modelCollectionKey(), obj.id)
      .exec(function(err){
        if (err) throw err
        if (typeof callback === 'function') callback(err, obj.id)
      })
    })
  },

  get: function(id, callback){
    var model = this
    redis.hgetall(model.idKey(id), function(err, reply){
      if (err) throw err
      callback(err, model.new(reply))
    })
  }
}

module.exports = DBModel
