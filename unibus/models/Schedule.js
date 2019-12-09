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
  start0:{
    type:Date
  },
  end0:{
    type:Date
  },
  start1:{
    type:Date
  },
  end1:{
    type:Date
  },
  start2:{
    type:Date
  },
  end2:{
    type:Date
  },
  start3:{
    type:Date
  },
  end3:{
    type:Date
  },
  start4:{
    type:Date
  },
  end4:{
    type:Date
  },
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