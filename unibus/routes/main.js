//router of main page
var express = require('express');
var router = express.Router();

//shows main page
router.get('/', (req, res, next)=> {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  return res.render('main');
});

module.exports = router;