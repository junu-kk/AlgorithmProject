//router of professor page
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Class = require('../models/Class');


function authCheck(req, res, callback){
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  User.findOne({email:req.user.email}).populate('classes').exec((err,user)=>{
    if(err) throw err;
    if(user.type=="Student") return res.redirect('/main');
    if(user.type=="Professor") callback(req,res,user);
  });
}

router.get('/', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    return res.render('professor/main',{
      user:user
    });
  });
});

router.get('/class/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    res.render('professor/class_create');
  });
});

router.post('/class/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    var newClass = new Class();
    newClass.name=req.body.name;
    newClass.info=req.body.info;
    newClass.saveClass((err)=>{
      if(err) throw err;
    });
    user.classes.push(newClass._id);
    user.saveUser((err)=>{
      if(err) throw err;
    });
    res.redirect('/professor');
  });
})


router.get('/class/:id', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    //이름충돌 때문에 class 대신 classs씀.
    Class.findById(req.params.id).populate('students').exec((err,classs)=>{
      if(err) throw err;
      return res.render('professor/class',{
        classs:classs
      });
    });
  });
});
router.get('/class/:id/team', (req,res)=>{

});

router.get('/class/:id/team/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    Class.findById(req.params.id).populate('students').exec((err,classs)=>{
      if(err) throw err;
      res.render('professor/team_create',{
        classs:classs
      });
    });
  });
});

router.post('/class/:id/team/create', (req,res)=>{
  console.log(req.body);
  res.redirect('/professor');
  /*
  authCheck(req.res,(req,res,user)=>{
    //user마다 member를 만들고
    //member가 모인 team을 만든다.
    console.log(req.body);
    res.redirect('/professor');
  });
  */
});

module.exports = router;