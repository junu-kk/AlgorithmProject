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
  },
  sid:{
    type:String,
  },
  classes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Class'
  }],
  teams:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Team'
  }],
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  timetable:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Timetable'
  },
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