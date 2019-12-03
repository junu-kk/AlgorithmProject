var express = require('express');
var router= express.Router();
var User = require('../models/User');
var Member = require('../models/Member');
var Team = require('../models/Team')

router.get('/', (req,res)=>{
  if(req.isUnauthenticated()){
    res.redirect('/login');
  }
  Member.findOne({_id:req.user.members[0]}).exec((err,member)=>{
    if(err) throw err;
    Team.findOne({_id:member.team}).exec((err,team)=>{
      if(err) throw err;
      if(member.isLeader==true){
        res.render('team_leader',{
          team:team
        });
      } else if(team.members.includes(member._id)){
        res.render('team_member', {
          team:team
        });
      } else{
        res.redirect('/main');
      }
    });
  });
});

module.exports = router;