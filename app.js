const express = require('express')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const conf = require('./config').db
const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy

const app = express()

var accessLog = fs.createWriteStream('access.log', {flags: 'a'})
var errorLog = fs.createWriteStream('error.log', {flags: 'a'})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(favicon(path.join(__dirname, 'public/images', 'fluidicon.png')))
app.use(logger({stream: accessLog}))
app.use(bodyParser({keepExtensions: true, uploadDir: './upload'}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
app.use(passport.initialize()) // 初始化passport

app.use(session({
    secret: conf.cookieSecret,
    key: conf.db,
    // 30 day
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, 
    store: new MongoStore({
        url: conf.url,
        // 14 days. Default
        ttl: 14 * 24 * 60 * 60 
    })
}))

function checkLogin (req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录！')
    res.redirect('/login')
  }
  next()
}

function checkNotLogin (req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录')
    res.redirect('back')
  }
  next()
}

app.use('/reg',     checkNotLogin)
app.use('/login',   checkNotLogin)
app.use('/publish', checkLogin)
app.use('/logout',  checkLogin)
app.use('/list',    checkLogin)

app.use('(/|/index|/home|/default)', require('./routes/index'))
app.use('/reg',    require('./routes/reg'))
app.use('/login',  require('./routes/login'))
app.use('/publish',   require('./routes/publish'))
app.use('/logout', require('./routes/logout'))
app.use('/list', require('./routes/list'))
app.use('/article', require('./routes/article'))
app.use('/upload', require('./routes/upload'))


if (app.get('env') === 'development') {
    passport.use(new GithubStrategy({
        clientID: "e50400ce682488d87b71",
        clientSecret: "13e406e42b4578ab600c93df8e059bd80a3205b8",
        callbackURL: "http://localhost:3000/login/github/callback"
    }, function (accessToken, refreshToken, profile, done) {
        done(null, profile);
    }))
}

app.use(function (err, req, res, next) {
  var meta = `[${new Date()}] ${req.url} \n`;
  errorLog.write(meta + err.stack + '\n');
  next();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
