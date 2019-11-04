var mongoose = require('mongoose');

var memberSchema = mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  team:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Team'
  },
  point:{
    type:Number,
  },
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  appointments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Appointment'
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