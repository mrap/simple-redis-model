# simple-redis-model

Object Models + Redis

### Installation

    npm install simple-redis-model

---------------------------------------------------------------

### Getting Started

### Create a Model

Requires: a `modelName` (string)

Optional: Array of attribute names.

**IMPORTANT**: only these specified attributes will be saved to Redis

    // awesome_model.js
    var RedisModel = require('simple-redis-model')
    var AwesomeModel = new RedisModel("AwesomeModel", ["myAttributeA", "myAttributeB"])

    module.exports = AwesomeModel

---------------------------------------------------------------

### Working with Objects
Remember: all operations are async. All operations use typical `function(err, res)` callbacks.

##### Create a new local model object (not yet saved to Redis)

    // some_file.js
    var AwesomeModel = require('./awesome_model')
    var awesomeObj = AwesomeModel.new({myAttributeA: "attribute value A",
                                       myAttributeB: "attribute value B"})

#### Save an object to Redis
Pass in the object you want to save.
Callback returns the saved object's id.

    AwesomeModel.save(awesomeObj, function(err, objectID){
      console.log(objectID) // => "awesome_model:1"
    })

#### Get an object from Redis
Pass in the object_id.
Callback returns the constructed object.

    AwesomeModel.get(objectID, function(err, obj){
        console.log(obj) // => { myAttributeA: 'attribute value A',
                                 myAttributeB: 'attribute value B',
                                 id: 'awesome_model:1' }
    })

#### Delete an object from Redis
Pass in the object_id
Callback returns the deleted object.

    AwesomeModel.delete(objectID, function(err, obj){
        console.log(obj) // => { myAttributeA: 'attribute value A',
                                 myAttributeB: 'attribute value B',
                                 id: 'awesome_model:1' }
    })
