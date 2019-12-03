//router of main page
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Class = require('../models/Class');

function authCheck(req, res, callback){
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  console.log(req.user);
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.type=="Professor") return res.redirect('/professor');
    if(user.type=="Student") callback(req,res,user);
  });
}

//shows main page
router.get('/', (req, res)=> {
  authCheck(req,res,(req,res,user)=>{
    return res.render('main',{
      user:user
    });
  });
});

router.post('/enroll', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    Class.findById(req.body._id).exec((err,classs)=>{
      //id가 유효하지 않으면?
      if(err){
        console.log(err);
        throw err;
      }
      user.classes.push(req.body._id);
      classs.students.push(user._id);
      user.saveUser((err)=>{
        if(err) throw err;
      });
      classs.saveClass((err)=>{
        if(err) throw err;
      });
      res.redirect('/main');

    });
  });
});

module.exports = router;