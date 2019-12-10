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
          team:team,
          active:'team'
        });
      } else{
        res.render('student/team_member',{
          user:user,
          team:team,
          active:'team'
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

router.get('/freerider', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    if(!user.isLeader) return res.render('student/warning');
    Team.findById(user.team).populate('members').exec((err,team)=>{
      if(err) throw err;
      var i=0;
      var min=team.members[i].point
      var minIndex=0;
      for(i=1;i<team.members.length;i++){
        if(team.members[i].point<min){
          minIndex=i;
          min=team.members[i].point;
        }
      }
      
      return res.render('student/freerider',{
        user:user,
        team:team,
        freerider:team.members[minIndex],
        active:'freerider'
      });
      
    });
  });
});

router.post('/freerider', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    
    User.findById(req.body.freerider).exec((err,freerider)=>{
      if(err) throw err;
      freerider.isFreerider=true;
      freerider.pic='/image/freerider.png';
      freerider.saveUser((err)=>{
        if(err) throw err;
      });
      res.redirect('/main');
    })
  })
})
module.exports = router;