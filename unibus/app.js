var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var library={
  passport : require('./library/passport'),
  database : require('./library/database'),
};
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var mainRouter = require('./routes/main');
var professorRouter = require('./routes/professor');
var profileRouter = require('./routes/profile');
var teamRouter = require('./routes/team');
var scheduleRouter = require('./routes/schedule');

var app = express();

library.passport();
library.database();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//img middleware
//app.use(methodOverride('_method'));
//app.use(bodyParser.json());
app.use('/image',express.static('./upload'));

//authentication middleware
app.use(session({secret:'@$!#!D1!@#%!(^)$@#', resave:true, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/professor', professorRouter);
app.use('/profile', profileRouter);
app.use('/team', teamRouter);
app.use('/schedule', scheduleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  console.log('merong');
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
