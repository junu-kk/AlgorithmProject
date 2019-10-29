//code for authentication by using passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = function(){
  passport.serializeUser(function(user,done){
    done(null,user);
  });

  passport.deserializeUser(function(user,done){
    done(null,user);
  });

  passport.use('local-login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true,

  }, function(req,email,password,done){
    User.findOne({email:email}, function(err,user){
      if(err){//펑션오류
        return done(err);
      }
      if(!user){//이멜틀림
        return done(null,false,{
          message:'Incorrect Email.'
        });
      }
      if(!user.passwordCheck(password)){//비번틀림
        return done(null,false,{
          message:'Incorrect Password.'
        });
      }
      return done(null,user);//성공
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true,
  }, function(req,email,password,done){
    User.findOne({email:email},function(err,user){
      if(err){//펑션오류
        return done(err);
      }
      if(user){//이메일이미존재
        return done(null,false,{
          message:'Email already exists.'
        });
      } else{//성공
        
      }
      
    });
  }));
}