var mongoose = require('mongoose');

var postSchema=mongoose.Schema({
  title:{
    type:String,
  },
  contents:{
    type:String,
  },
  updateTime:{
    type:Date,
    default:Date.now(),
  },
  //좋아요댓글점수등등 구현해야함
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