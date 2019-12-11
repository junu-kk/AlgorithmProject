//인덱스 라우터. 인증기능들.
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index_new');
});

//for login page
router.get('/login', (req,res)=>{
  res.render('authentication/login_new');
});

//for login procedure
router.post('/login', passport.authenticate('local-login',{
  //successRedirect:'/',
  failureRedirect:'/login',
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
  return res.render('authentication/signup_new');
});

//for signup procedure
router.post('/signup', passport.authenticate('local-signup',{
  failureRedirect:'/signup',
  successRedirect:'/',
}));

module.exports = router;
