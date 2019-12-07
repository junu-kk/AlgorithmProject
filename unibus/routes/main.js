//router of main page
var express = require('express');
var router = express.Router();
var Class = require('../models/Class');
var Post = require('../models/Post');

function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}

//shows main page
router.get('/', (req, res)=> {
  authCheck(req,res,(req,res,user)=>{
    Post.find({team:user.team}).exec((err,posts)=>{
      if(err) throw err;
      res.render('student/main', {
        user:user,
        posts:posts,
      });
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