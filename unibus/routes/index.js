var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index_newnew');
});

//for login page
router.get('/login', (req,res)=>{
  var fmsg = req.flash();
  var feedback = '';
  if(fmsg.error){
    feedback = fmsg.error[0];
  }
  return res.render('authentication/login_new',{
    feedback:feedback,
  });
});

//for login procedure
router.post('/login', passport.authenticate('local-login',{
  //successRedirect:'/',
  failureRedirect:'/login',
  failureFlash:true,
}), (req,res)=>{
  User.findOne({email:req.user.email}, (err,user)=>{
    if(err) throw err;
    if(user.type=="Professor") return res.redirect('/professor');
    if(user.type=="Student") return res.redirect('/main')
  });
});

//for logout
router.get('/logout', (req,res)=>{
  req.logout();
  return res.redirect('/');
});

//for signup page
router.get('/signup', (req,res)=>{
  var fmsg = req.flash();
  var feedback = '';
  if(fmsg.error){
    feedback = fmsg.error[0];
  }
  return res.render('authentication/signup_new',{
    feedback:feedback,
  });
});

//for signup procedure
router.post('/signup', passport.authenticate('local-signup',{
  failureRedirect:'/signup',
  failureFlash:true,
  successRedirect:'/',
}));

module.exports = router;
