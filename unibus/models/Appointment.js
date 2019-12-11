//code for appointment schema
var mongoose = require('mongoose');

var appointmentSchema = mongoose.Schema({
  startDate:{
    type:Date,
    default:''
  },
  endDate:{
    type:Date,
    default:''
  },
  team:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Team'
  },
  users:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User',
    default:[]
  }],
  info:{
    type:String
  },
  //시작시간 9시 끝나는시간 12시
  plan:{
    startDate:{
      type:Date,
    },
    endDate:{
      type:Date
    },
    schedules:[{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'Schedule',
      //default:[]
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