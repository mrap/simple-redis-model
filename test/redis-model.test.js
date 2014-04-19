var chai   = require('chai'),
    should = chai.should()

describe("RedisModel", function(){
  // Flush Redis DB
  beforeEach(function(done){
    var redis = require('../lib/redis-client')
    redis.flushdb(function(err, reply){
      if (err) throw err
      done()
    })
  })
  var RedisModel = require('../lib/redis-model')

  describe("creating a custom model", function(){
    var customModel
    describe("without attributes", function(){
      before(function(){
        customModel = new RedisModel("CustomModel")
      })

      it("should be an instance of RedisModel", function(){
        customModel.should.be.an.instanceof(RedisModel)
      })

      it("should have a modelName", function(){
        customModel.modelName.should.equal("CustomModel")
      })

      it("should have empty attrs", function(){
        customModel.attrs.should.be.empty
      })
    })

    describe("with attributes", function(){
      var attrA = "myAttribute1"
      var attrB = "myAttribute2"
      var customAttrs = new Array(attrA, attrB)
      before(function(){
        customModel = new RedisModel("CustomModel", customAttrs)
      })

      it("should have attrs", function(){
        customModel.attrs.should.be.instanceof(Array)
        customModel.attrs.should.include(attrA)
        customModel.attrs.should.include(attrB)
        customModel.attrs.length.should.equal(2)
      })
    })
  })

  describe("creating objects", function(){
    var attr1 = "attr1"
    var attr2 = "attr2"
    var customAttrs
    var CustomModel
    var customObj
    before(function(){
      customAttrs = new Array(attr1, attr2)
      CustomModel = new RedisModel("CustomModel", customAttrs)
    })

    describe("without providing parameters", function(){
      before(function(){
        customObj = CustomModel.new()
      })

      it("should instantiate without the attrs", function(){
        customObj.should.not.have.ownProperty(attr1)
        customObj.should.not.have.ownProperty(attr2)
      })
    })

    describe("providing parameters", function(){
      before(function(){
        customObj = CustomModel.new({attr1: "my first attribute"})
      })

      it("should instantiate with provided attrs", function(){
        customObj.should.have.ownProperty(attr1)
        customObj.should.not.have.ownProperty(attr2)
      })
    })
  })

  describe("saving/getting objects to Redis", function(){
    var attr1
    var attr2
    var customAttrs
    var CustomModel
    var customObj
    beforeEach(function(done){
      var attr1 = "attr1"
      var attr2 = "attr2"
      customAttrs = new Array(attr1, attr2)
      CustomModel = new RedisModel("CustomModel", customAttrs)
      done()
    })

    describe("saving an object", function(){
      beforeEach(function(done){
        customObj = CustomModel.new({attr1: "my attribute"})
        done()
      })

      it("should return the objectID", function(done){
        CustomModel.save(customObj, function(err, objID){
          if (err) throw err
          objID.should.equal("CustomModel_id:1")
          done()
        })
      })
    })
  })
})
