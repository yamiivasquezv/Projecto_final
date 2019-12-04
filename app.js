const createError = require('http-errors');
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport= require('passport');
const flash= require('connect-flash');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
//const logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

const app = express();
require('./mongodb');
require('./config/passport');
require('./config/pin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Middlewares
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//sesiones
app.use(session({
  secret: 'useruser',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variable global
app.use((req,res,next)=>{
  res.locals.success_msg= req.flash('success_msg');
  res.locals.error_msg= req.flash('error_msg');
  res.locals.error=req.flash('error');
  res.locals.user=req.user || null;
  next();
});

app.use(cookieParser());
//app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
