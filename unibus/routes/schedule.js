var express = require('express');
var router = express.Router();
var Appointment = require('../models/Appointment');
var Team = require('../models/Team');
var Schedule = require('../models/Schedule');
var User = require('../models/User');

function authCheck(req, res, callback){
  if(req.isUnauthenticated()) return res.redirect('/login');
  if(req.user.type=="Professor") return res.redirect('/professor');
  if(req.user.type=="Student") callback(req,res,req.user);
}

//appointment를 생성하자.
router.get('/create', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    if(!user.isLeader){
      return res.render('student/warning',{
        user:user
      });
    }
    Team.findById(user.team).exec((err,team)=>{
      if(err) throw err;
      if(team.appointment) return res.redirect('/schedule/fix');
      else res.render('student/schedule_create',{
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
    return newAppointment.save()
    .then(()=>{
      return Team.findById(user.team)
    })
    .then((team)=>{
      team.appointment=newAppointment._id;
      return team.save()
    })
    .then(()=>{
      res.redirect('/schedule/input');
    })
    .catch((err)=>{
      if(err) throw err;
    })
  })
})

/*
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
*/
router.get('/input', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    Team.findById(user.team).populate('appointment').exec((err,team)=>{
      if(err) throw err;
      if(!team.appointment) return res.render('student/warning');
      else{
        res.render('student/schedule_input',{
          user:user,
          app:team.appointment
        });
      }
    });
  });
});

router.post('/input', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    Team.findById(user.team).exec((err,team)=>{
      if(err) throw err;

      Appointment.findById(team.appointment).exec((err,appointment)=>{
        if(err) throw err;
        console.log(req.body);
        var newSchedule = new Schedule();
        
        newSchedule.start0=req.body.start0;
        newSchedule.end0=req.body.end0;
        newSchedule.start1=req.body.start1;
        newSchedule.end1=req.body.end1;
        newSchedule.start2=req.body.start2;
        newSchedule.end2=req.body.end2;
        newSchedule.start3=req.body.start3;
        newSchedule.end3=req.body.end3;
        newSchedule.start4=req.body.start4;
        newSchedule.end4=req.body.end4;
        
        newSchedule.appointment=appointment._id;
        console.log(newSchedule);
        newSchedule.saveSchedule((err)=>{
          if(err) throw err;
        })
        
        appointment.plan.schedules.push(newSchedule._id);
        appointment.saveAppointment((err)=>{
          if(err) throw err;
        })
        
        User.findById(user._id).exec((err,user)=>{
          if(err) throw err;
          user.schedule = newSchedule._id;
          user.saveUser((err)=>{
            if(err) throw err;
          });
        })
        
        
        
      })
    })
  })
  res.redirect('/main');
})

router.get('/fix', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    if(!user.isLeader){
      return res.render('student/warning',{
        user:user
      });
    }
    Appointment.findOne({team:user.team}).exec((err,appointment)=>{
      if(err) throw err;
      Team.findById(user.team).populate('members').exec((err,team)=>{
        if(err) throw err;
        res.render('student/schedule_fix',{
          user:user,
          app:appointment,
          team:team
        });
      });
      
    });
    
  });
});

router.post('/fix', (req,res)=>{
  //그리디가 들어가는 부분. 추후구현예정
  res.redirect('/schedule/result');
});

router.get('/result', (req,res)=>{
  authCheck(req,res,(req,res,user)=>{
    Team.findById(user.team).populate('members').exec((err,team)=>{
      if(err) throw err;
      return res.render('student/result',{
        user:user,
        team:team
      });
    });
  });
});
module.exports = router;