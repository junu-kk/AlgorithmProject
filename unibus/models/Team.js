var mongoose = require('mongoose');

var teamSchema=mongoose.Schema({
  class:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Class'
  },
  leader:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Member'
  },
  freerider:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Member'
  },
  members:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Member'
  }],
  name:{
    type:String,
  },
  posts:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Post'
  }],
  appointments:[{
    type:mongoose.SchemaTypes.ObjectId,
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