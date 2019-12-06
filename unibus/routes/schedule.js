var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
  if(req.isUnauthenticated()){
    res.redirect('/login');
  }
  res.render('schedule');
});

module.exports = router;