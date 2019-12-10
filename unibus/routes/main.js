//router of main page
var express = require('express');
var router = express.Router();
var Class = require('../models/Class');
var Post = require('../models/Post');
var User = require('../models/User');

function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}

//shows main page
router.get('/', (req, res)=> {
  authCheck(req,res,(req,res,user)=>{
    if(!user.class) return res.redirect('/main/enroll');
    if(!user.team) return res.redirect('/main/no_team');
    Post.find({team:user.team}).populate('posted_by').exec((err,posts)=>{
      if(err) throw err;
      res.render('student/main_new', {
        user:user,
        posts:posts,
        active:'main',
      });
    });
  });
});

router.get('/no_team', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    res.render('student/no_team',{
      user:user,
      active:'main'
    });
  });
});

router.get('/enroll', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    //경찬이 완성되면 enroll_new로 바꿀것.
    res.render('student/enroll_wkc', {
      user:user,
      active:'main'
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
      User.findById(req.user._id).exec((err,user)=>{
        if(err) throw err;
        user.class = req.body._id;
        classs.students.push(user._id);
        user.saveUser((err)=>{
          if(err) throw err;
        });
        classs.saveClass((err)=>{
          if(err) throw err;
        });
      });
      res.redirect('/main');
    });
  });
});

module.exports = router;