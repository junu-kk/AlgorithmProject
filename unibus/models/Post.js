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
    default:Date.now,
  },
  by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Member'
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Member'
  }],
  comments:[{
    by:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Member'
    },
    contents:{
      type:String,
    },
    updateTime:{
      type:Date,
      default:Date.now,
    }
  }],
  file:{
    type:String,
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