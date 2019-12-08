var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}


//게시물 생성
router.get('/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    res.render('student/create_post',{
      user:user
    });
  });
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

