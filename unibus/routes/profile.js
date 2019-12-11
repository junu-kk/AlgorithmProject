//프로필 라우터
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var multer = require('multer');
var upload = multer({dest:'./upload'});

//로그인 안되어있으면 로그인으로 리다이렉트, 교수자면 교수자로 리다이렉트, 아니면 콜백함수 실행.
function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}

//프로필 메인
router.get('/', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    res.render('student/profile_new', {
      user:user,
      active:'profile'
    });
  });
});

//프로필사진 업로드
router.post('/upload', upload.single('file'), (req, res, next) => {
  let image='/image/'+req.file.filename;
  authCheck(req,res,(req,res,user)=>{
    User.findById(user._id).exec((err,user)=>{
      if(err) throw err;
      user.pic = image;
      user.saveUser((err)=>{
        if(err) throw err;
      });
      res.redirect('/profile');
    });
  });
});

module.exports = router;