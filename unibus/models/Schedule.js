var mongoose = require('mongoose');

var scheduleSchema=mongoose.Schema({
  user:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User'
  },
  appointment:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Appointment'
  },
  time:[{
    start:{
      type:Date
    },
    end:{
      type:Date
    }
  }]
});

scheduleSchema.methods={
  saveSchedule:function(callback){
    var self=this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  }
}

module.exports=mongoose.model('Schedule', scheduleSchema);