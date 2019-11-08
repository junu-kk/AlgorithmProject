var mongoose = require('mongoose');
var appointmentSchema = mongoose.Schema({
  date:{
    type:Date,
    default:Date.now,
  },
  team:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Team'
  },
  members:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Member'
  }],
  info:{
    type:String
  },
  plan:{
    startDate:{
      type:Date,
    },
    endDate:{
      type:Date
    },
    schedules:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Schedule'
    }],
  },
  is_fixed:{
    type:Boolean,
    default:false
  }
});

appointmentSchema.methods={
  saveAppointment:function(callback){
    var self=this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  }
}

module.exports = mongoose.model('Appointment', appointmentSchema);