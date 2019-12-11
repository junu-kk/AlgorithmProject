//code for team schema
var mongoose = require('mongoose');

var teamSchema=mongoose.Schema({
  class:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Class'
  },
  teamNumber:{
    type:Number,
  },
  leader:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  freerider:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User',
  },
  members:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User',
    default:[]
  }],
  posts:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Post',
    default:[]
  }],
  appointment:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Appointment'
  }
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