var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*var hbs=require('express-handlebars');*/
var exphbs = require('express-handlebars');

var expressSession = require('express-session');
var expressValidator = require('express-validator');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    exists: function (variable, options) {
      if (typeof variable !== 'undefined') {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    }
  },
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views'
});

// view engine setup
/*app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname + '/views'}));*/
app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));
app.use('/', index);
app.use('/users', users);



/*Handlebars.registerHelper('exists', function(variable, options) {
    if (typeof variable !== 'undefined') {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
