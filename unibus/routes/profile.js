var express = require('express');
var router = express.Router();
var User = require('../models/User');
var multer = require('multer');
var upload = multer({dest:'./upload'});

function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}

router.get('/', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    res.render('student/profile_new', {
      user:user
    });
  });
});

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