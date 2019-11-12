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
  team:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Team',
  },
  posted_by:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Member'
  },
  views_by:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Member'
  }],
  comments:[{
    by:{
      type:mongoose.SchemaTypes.ObjectId,
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