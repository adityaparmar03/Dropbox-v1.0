var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var signin = require('./routes/signin');
var signup = require('./routes/signup');
var home = require('./routes/home');
var profile = require('./routes/profile');
var upload = require('./routes/upload');
var folder = require('./routes/folder');
var star = require('./routes/star');
var share = require('./routes/share');
var activitylog = require('./routes/activitylog');
var deletecontent = require('./routes/deletecontent');

var app = express();
var cors = require('cors')
app.use(cors())
//Intial Database
var init = require('./routes/init')
init.create_database_tables();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('./public/files', express.static(path.join(__dirname, 'files')));

app.use('/', index);
app.use('/signin', signin);
app.use('/signup', signup);
app.use('/home', home);
app.use('/profile', profile);
app.use('/upload', upload);
app.use('/folder', folder);
app.use('/star', star);
app.use('/share', share);
app.use('/activitylog', activitylog);
app.use('/deletecontent', deletecontent);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
});

module.exports = app;
