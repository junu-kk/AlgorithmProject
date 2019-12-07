var mongoose = require('mongoose');

var classSchema=mongoose.Schema({
  professor:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User',
  },
  students:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User',
  }],
  teams:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Team',
  }],
  name:{
    type:String,
  },
  class_id:{
    type:String,
  },
  year:{
    type:Number,
  },
  semester:{
    type:String,
    enum:['1학기', '2학기', '여름계절', '겨울계절']
  }
});

classSchema.methods={
  saveClass:function(callback){
    var self=this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  }
}

module.exports=mongoose.model('Class', classSchema);