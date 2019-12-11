//code for post schema
var mongoose = require('mongoose');

var postSchema=mongoose.Schema({
  title:{
    type:String,
  },
  idx:{
    type:Number,
  },
  contents:{
    type:String,
  },
  updateTime:{
    type:Date,
    default:Date.now,
  },
  team:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Team',
  },
  posted_by:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  views_by:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User'
  }],
  file:{
    type:String,
    default:''
  }
});

postSchema.methods={
  savePost:function(callback){
    var self=this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  }
}

module.exports=mongoose.model('Post', postSchema);