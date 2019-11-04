//router for logout
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for logout
router.get('/', (req,res,next)=>{
  req.logout();
  return res.redirect('/');
});

module.exports = router;