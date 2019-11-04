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