var express = require('express');
var router = express.Router();

function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}

//appointment를 생성하자.
router.get('/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    if(!user.isLeader) return res.render('student/warning');
    else res.render('student/schedule_create',{
      user:user
    });
    
  })
});

//일정을 입력하자.
router.get('/input', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    if(user.team)

  })
})

module.exports = router;