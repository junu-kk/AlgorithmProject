//router for login
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for login page
router.get('/', (req,res,next)=>{
  var fmsg = req.flash();
  var feedback = '';
  if(fmsg.error){
    feedback = fmsg.error[0];
  }
  return res.render('authentication/login',{
    feedback:feedback,
  });
});

//for login procedure
router.post('/', passport.authenticate('local-login',{
  //successRedirect:'/',
  failureRedirect:'/login',
  failureFlash:true,
}), (req,res)=>{
  return res.redirect('/main');
});

module.exports = router;