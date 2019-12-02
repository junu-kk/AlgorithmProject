var express = require('express');
var router = express.Router();
var User = require('../models/User');
var multer = require('multer');
var upload = multer({dest:'./upload'});

router.get('/', (req,res)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }

  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;
    res.render('profile',{
      user:user
    });
  });
});

router.post('/upload', upload.single('file'), (req, res, next) => {
  let image='/image/'+req.file.filename;
  
  User.findOne({ email: req.user.email }).exec((err, user)=> {
    if (err) throw err;
    
    user.pic = image;
    user.saveUser((err) => {
      if (err) throw err;
    });
    
    res.redirect('/profile');
  });
});

module.exports = router;