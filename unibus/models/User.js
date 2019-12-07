var mongoose = require('mongoose');

var userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    trim:true,
  },
  type:{
    type:String,
    default:'Student',
    enum:['Student','Professor','Administrator'],
  },
  pic:{
    type:String,
    default:'profile_pic'
  },
  sid:{
    type:String,
  },
  class:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Class'
  },
  //여기부터는 member에서 넘어온 값들
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
    ref:'Post',
    default:[]
  }],
  appointments:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Appointment',
    default:[]
  }],
  schedules:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Schedule',
    default:[]
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

userSchema.methods = {
  saveUser: function(callback){
    var self = this;

    this.validate(function(err){
      if(err) return callback(err);
      self.save(callback);
    });
  },

  passwordCheck: function(password){
    if(password===this.password){
      console.log('비번같아');
      return true;
    } else{
      console.log('비번달라');
      return false;
    }
  },
}

module.exports = mongoose.model('User', userSchema);