var mongoose = require('mongoose');

var teamSchema=mongoose.Schema({
  class:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Class'
  },
  leader:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Member'
  },
  freerider:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Member'
  },
  members:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Member'
  }],
  name:{
    type:String,
  },
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  appointments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Appointment'
  }]
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