var express = require('express');
var router = express.Router();
var Appointment = require('../models/Appointment');
var Team = require('../models/Team');

function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}

//appointment를 생성하자.
router.get('/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    if(!user.isLeader) return res.render('student/warning');
    Team.findById(user.team).exec((err,team)=>{
      if(err) throw err;
      if(team.appointment) return res.redirect('/schedule/fix');
      else res.render('student/calendar_original',{
        user:user
      });
    });
  });
});

router.post('/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    var newAppointment = new Appointment();
    newAppointment.team = user.team;
    newAppointment.info = req.body.title;
    newAppointment.plan.startDate = req.body.start;
    newAppointment.plan.endDate = req.body.end;
    newAppointment.save()
    .then(()=>{
      Team.findById(user.team).exec((err,team)=>{
        team.appointment=newAppointment._id;
        team.save();
      })
    })
    .then(()=>{
      res.redirect('/schedule/input');
    })
  });
});

router.get('/input', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    Team.findById(user.team).exec((err,team)=>{
      if(err) throw err;
      if(!team.appointment) return res.redirect('/main');
      else{
        res.render('student/schedule_input',{
          user:user
        });
      }
    });
  });
});

//일정을 입력하자.
/*
router.get('/input', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    if(user.team)

  })
})
*/
module.exports = router;