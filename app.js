const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// https://github.com/jaredhanson/connect-flash
const flash = require('connect-flash');
// https://github.com/expressjs/session
const session = require('express-session');
// https://github.com/jdesboeufs/connect-mongo
const MongoStore = require('connect-mongo')(session);
const conf = require('./config').db;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'fluidicon.png')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
    secret: conf.cookieSecret,
    key: conf.db,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // 30 day
    store: new MongoStore({
        url: conf.url,
        ttl: 14 * 24 * 60 * 60 // 14 days. Default
    })
}))

app.use('(/|/index|/home|/default)', require('./routes/index'))
app.use('/reg',    require('./routes/reg'))
app.use('/login',  require('./routes/login'))
app.use('/post',   require('./routes/post'))
app.use('/logout', require('./routes/logout'))

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
  res.render('error');
});

module.exports = app;
