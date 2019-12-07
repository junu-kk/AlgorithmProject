var express = require('express');
var router= express.Router();
//var User = require('../models/User');
//var Member = require('../models/Member');
var Team = require('../models/Team')



router.get('/', (req,res)=>{
  if(req.isUnauthenticated()){
    res.redirect('/login');
  }
  Team.findOne({_id:req.user.team}).exec((err,team)=>{
    if(err) throw err;
    if(req.user._id==team.leader){
      return res.render('student/team_leader',{
        team:team
      });
    }
    if(req.user.isLeader==false){
      return res.render('student/team_member', {
        team:team
      });
    }
    res.redirect('/main');
  });
});

module.exports = router;