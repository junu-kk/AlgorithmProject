var mongoose = require('mongoose');

var memberSchema = mongoose.Schema({
  user:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  team:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Team'
  },
  point:{
    type:Number,
    default:0,
  },
  posts:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Post'
  }],
  appointments:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Appointment'
  }],
  schedules:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Schedule'
  }],
  isFreeRider:{
    type:Boolean,
    default:false,
  },
  isLeader:{
    type:Boolean,
    default:false,
  }
});

memberSchema.methods={
  saveMember:function(callback){
    var self=this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  }
}

module.exports = mongoose.model("Member", memberSchema);