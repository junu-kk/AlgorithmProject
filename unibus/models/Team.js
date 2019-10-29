var mongoose = require('mongoose');

var teamSchema=mongoose.Schema({
  class:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Class'
  },
  leader:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  members:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  name:{
    type:String,
  },
  posts:{
    type:String,
    ref:'Post'
  },
});

teamSchema.methods={
  saveTeam:function(callback){
    var self=this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  }
}

module.exports=mongoose.model('Team', teamSchema);