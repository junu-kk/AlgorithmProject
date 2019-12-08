var express = require('express');
var router = express.Router();

function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}

router.get('/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    if(!user.isLeader) return res.redirect('/main');
    
  })
});

module.exports = router;