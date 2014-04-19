var assert = require('assert')

// Converts camelCase and PascalCase to underscore_case
var snakecaseString = function(str) {
  var uStr = str.substr(0,1).toLowerCase() + str.substr(1,str.length)
  return uStr.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase()})
}

// params:
// modelName: string describing the Model's name
// attrs: array of attribute names
var DBModel = function DBModel(modelName, attrs, redisClient){
  assert(typeof modelName === 'string', "A RedisModel requires a modelName(string) as the second parameter")
  this.redisClient = redisClient || require('redis').createClient()
  this.modelName = modelName
  this.modelNameCased = snakecaseString(modelName)
  this.attrs = (attrs instanceof Array) ? attrs : new Array()
  return this
}

DBModel.prototype = {
  new: function(attrs){
    var obj = new Object()
    obj.id
    for(var a in attrs) obj[a] = attrs[a]
    return obj
  },

  // Database Operations
  nextIdKey:          function() { return "next" + this.modelNameCased + "" },
  idKey:              function(id) { return this.modelNameCased + ":" + id },
  idKeyForAttribute:  function(id, attr) { return this.idKey(id) + ":" + attr },
  modelCollectionKey: function(){ return this.modelNameCased + "_ids" },

  save: function(obj, callback){
    var model = this
    model.redisClient.incr(model.nextIdKey(), function(err, nextId){
      obj.id = model.idKey(nextId)
      if (err) throw err
      model.redisClient.multi()
      .HMSET(obj.id, obj)
      .sadd(model.modelCollectionKey(), obj.id)
      .exec(function(err){
        if (err) throw err
        if (typeof callback === 'function') callback(err, obj.id)
      })
    })
  },

  get: function(id, callback){
    var model = this
    model.redisClient.hgetall(id, function(err, reply){
      if (err) throw err
      callback(err, model.new(reply))
    })
  },

  delete: function(id, callback){
    var model = this
    // Get object first because we return it later
    var objectToDelete
    model.get(id, function(err, res){
      if (err) throw err
      objectToDelete = res
      model.redisClient.del(id, function(err, res){
        if (err) throw err
        callback(err, objectToDelete)
      })
    })
  }
}

module.exports = DBModel
