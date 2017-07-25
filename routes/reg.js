var express = require('express')
var router = express.Router()
var crypto = require('crypto')
var User = require('../models/user')

router.post('/', function (req, res) {
    var name = req.body.name
    var pwd = req.body.pwd
    var confirm = req.body.confirm
    var email = req.body.email

    if (pwd !== confirm) {
        req.flash('error', '两次输入的密码不一样');
        return res.redirect('/reg');
    }

    var md5 = crypto.createHash('md5');
    pwd = md5.update(req.body.pwd).digest('hex');

    // 实例化User类对象
    var newUser = new User({name, pwd, email})

    // 获取用户信息
    User.get(name).then(user => {
       // 用户存在，返回错误信息
       if (user) {
           req.flash('error', '用户已存在');
           return res.redirect('/reg');
       }

       // 保存用户信息
       newUser.save().then(user => {
           req.session.user = user;
           req.flash('success', '注册成功');
           res.redirect('/');
       })

    // 捕捉get() 和 save()中所有的错误并且统一处理
    }).catch(err => {
        res.send(err)
        req.flash('err', err);
        return res.redirect('/reg');
    })
})


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('reg', {title: 'reg'});
});


module.exports = router;
