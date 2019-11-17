//router of professor page
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Class = require('../models/Class');
var Member = require('../models/Member');
var Team = require('../models/Team');

function loginCheck(req,res){
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
}

function authCheck(req, res, callback){
  loginCheck(req,res);
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
  //post는 그냥 인증체크 다 뺄까보다.
  
  //현 클래스 찾기
  Class.findById(req.params.id).exec((err,classs)=>{
    if(err) throw err;
  
    console.log(req.body);
    //팀이 겹치면 안되니까 teamList 생성
    var teamList=[];

    //8번반복
    for(var i=0;i<Object.keys(req.body).length;i++){
      //키는 user._id이고
      var key = Object.keys(req.body)[i];
      //value는 팀넘버와 리더여부를 담고있음. teamNumber와 isLeader로 쪼개주자.
      var value = req.body[key];
      var teamNumber;
      var isLeader;
      if(Array.isArray(value)){
        teamNumber = value[0];
        isLeader = true;
      } else{
        teamNumber = value;
        isLeader = false;
      }
      
      //key로 해당 user를 찾은 뒤
      User.findById(key).exec((err,keyuser)=>{
        if(err) throw err;
        //멤버를 만들자.
        //user, team, isLeader 넣어주고 save해야함.
        var newMember = new Member();
        newMember.user = keyuser._id;
        if(isLeader){
          newMember.isLeader = true;  
        }
        
        
        //기존에 존재하는 팀 vs 새로 만드는 팀
        //새로 만드는 경우 class, teamNumber 넣어줘야 하고 save해야하고
        //기존에 있는 경우 leader와 members 해주면됨.
        if(teamList.includes(teamNumber)){
          console.log(teamList);
          console.log('팀존재');
          Team.findOne({class:classs._id,teamNumber:teamNumber}).exec((err,team)=>{
            console.log(team);
            if(err) throw err;
            team.members.push(newMember._id);
            newMember.team = team._id;
            if(newMember.isLeader){
              team.leader = newMember._id;
            }
            
            team.saveTeam((err)=>{
              console.log('기본팀저장완료');
              if(err) throw err;
            });
            
          });
        } else{
          console.log(teamList);
          console.log('팀존재X');
          teamList.push(teamNumber);
          var newTeam = new Team();
          newTeam.class = classs._id;
          newTeam.teamNumber = teamNumber;
          newTeam.members.push(newMember._id);
          if(newMember.isLeader){
            newTeam.leader = newMember._id;
          }
          newTeam.saveTeam((err)=>{
            if(err) throw err;
          });
          classs.teams.push(newTeam._id);
          
          classs.saveClass((err)=>{
            console.log('새로운팀저장완료');
            if(err) throw err;
          });
          
          
        }

        newMember.saveMember((err)=>{
          if(err) throw err;
        });
        keyuser.members.push(newMember._id);
        keyuser.saveUser((err)=>{
          if(err) throw err;
        });
      });

      
    }
  });
  res.redirect('/professor');
  
});

module.exports = router;