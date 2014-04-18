var DBModel = require('./db-model')

var MyModel = new DBModel("MyModel", ['attributeA', 'attributeB'])
var obj = MyModel.new({name: "poop"})

MyModel.save(obj, function(err, res){
  MyModel.get(res, function(err, res){
  })
})

