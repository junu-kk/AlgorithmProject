//router of main page
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Class = require('../models/Class');
var Team = require('../models/Team');
var Post = require('../models/Post');

function authCheck(req, res, callback){
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    if(user.type=="Professor") return res.redirect('/professor');
    if(user.type=="Student") callback(req,res,user);
  });
}

//shows main page
/*
  매우 고민이 든다.
  사실 피드는 team에 있는 post를 전부 띄워야 하는데
  아!!!!! post를 찾고 그걸 teaa=user.member.team하면 되겠네!
*/
router.get('/', (req, res)=> {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  User.findOne({email:req.user.email}).populate('members').exec((err,user)=>{
    if(err) throw err;
    Post.find({team:user.members[0].team}).populate({path:'posted_by', populate:{path:'user'}}).exec((err,posts)=>{
      if(err) throw err;
      res.render('main', {
        user:user,
        posts:posts
      })
    })
  })
  /*
  User.findOne({email:req.user.email}).populate({
    path:'members',populate:{
      path:'team',populate:{
        path:'posts'
      }
    }}).exec((err,user)=>{
      if(err) throw err;
      //console.log(user.members[0].team.posts);
      res.render('main',{
        user:user,
        //posts:user.members[0].team.posts
      });
    })
  //team->posts를 띄워야겠지.
  //팀은 어떻게 찾지? user->member->team->post로 가야겠군.
  /*
  authCheck(req,res,(req,res,user)=>{
    
    return res.render('main',{
      user:user
    });
  });
  */
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