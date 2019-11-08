var mongoose = require('mongoose');

var scheduleSchema=mongoose.Schema({
  member:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Member'
  },
  appointment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Appointment'
  },
  time:[{
    day:[{
      startTime:{
        type:Date,
      },
      endTime:{
        type:Date
      }
    }]
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