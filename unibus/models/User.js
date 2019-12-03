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
  classes:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Class'
  }],
  members:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Member'
  }],
  idx:{
    type:Number,
    default:0
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