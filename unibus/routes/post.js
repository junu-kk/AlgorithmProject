var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var User = require('../models/User');
var Team = require('../models/Team');

function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}


//게시물 생성
router.get('/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    Post.find({team:user.team}).exec((err,posts)=>{
      if(err) throw err;
      res.render('student/create_post',{
        user:user,
        idx:posts.length+1
      });
    });
    
  });
});

router.post('/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    var newPost = new Post();
    newPost.title = req.body.title;
    newPost.contents = req.body.contents;
    newPost.team = user.team;
    newPost.posted_by = user._id;
    newPost.views_by.push(user._id);
    newPost.idx = req.body.idx;
    newPost.savePost((err)=>{
      if(err) throw err;
    });
    User.findById(user._id).exec((err,user)=>{
      if(err) throw err;
      user.posts.push(newPost._id);
      user.saveUser((err)=>{
        if(err) throw err;
      })
    });
    Team.findById(user.team).exec((err,team)=>{
      if(err) throw err;
      team.posts.push(newPost._id);
      team.saveTeam((err)=>{
        if(err) throw err;
      })
    })
  });
  res.redirect('/main');
});

//게시물 조회(id필요)
router.get('/:id', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    Post.findById(req.params.id).exec((err,post)=>{
      if(err) throw err;
      res.render('student/post',{
        user:user
      });
    });
  });
});
//게시물 수정(id필요) -> 추후구현

//게시물 삭제(id필요) -> 추후구현

module.exports = router;