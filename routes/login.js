var express = require('express')
var router = express.Router()
var crypto = require('crypto')
var User = require('../models/user')
const passport = require('passport')

router.post('/', function (req, res, next) {
    var name = req.body.name

    var md5 = crypto.createHash('md5')
    var pwd = md5.update(req.body.pwd).digest('hex')

     User.get(name).then(user => {
        if (!user) {
           req.flash('error', '用户不存在')
           return res.redirect('/login')
        }

        if (user.pwd != pwd) {
            req.flash('error', '密码错误')
            return res.redirect('/login')
        }

        req.session.user = user
        req.flash('success', '登录成功')
        res.redirect('/')
    }).catch(err => {
        throw new Error(err)
    })
})


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login',{ 
       title: "login",
       user: req.session.user,
       success: req.flash('success').toString(),
       error: req.flash('error').toString() 
    })
})

router.get('/github', passport.authenticate('github', {session: false}))

router.get('/github/callback',  passport.authenticate('github', {
      session: false,
      failureRedirect: '/login',
      successFlash: '登录成功?'
    }),
    function (req, res, next) {
      req.session.user = {
        name: req.user.username,
        head: "http://gravatar.com/avatar/" + req.user._json.gravatar_id + "?s=48"
      };
      res.redirect('/')
    }
)

module.exports = router
