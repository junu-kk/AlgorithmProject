var express = require('express');
var router= express.Router();
var User = require('../models/User');
var Team = require('../models/Team')

function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}

router.get('/', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    Team.findById(user.team).populate('members').exec((err,team)=>{
      if(err) throw err;
      if(user.isLeader){
        return res.render('student/team_leader',{
          user:user,
          team:team
        });
      } else{
        res.render('student/team_member',{
          user:user,
          team:team
        });
      }
    });
  });
});

router.post('/setjob', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    Team.findById(user.team).populate('members').exec((err,team)=>{
      if(err) throw err;
      console.log(req.body);
      for(var i=0;i<team.members.length;i++){
        User.findById(team.members[i]._id).exec((err,member)=>{
          if(err) throw err;
          member.job = req.body[member._id];
          member.save();
        });
      }
    });
    res.redirect('/team');
  });
});

module.exports = router;