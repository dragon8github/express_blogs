var express = require('express');
var router = express.Router();

// var crypto = require('crypto')
// var User = require('../models/user');

// router.post('/reg', function (req, res) {
//     var name = req.body.name;
//     var pwd = req.body.pwd;
//     var confirm = req.body.confirm;
//     var email = req.body.email;

//     if (pwd !== confirm) {
//         req.flash('error', '两次输入的密码不一样');
//         return res.redirect('/reg');
//     }

//     var md5 = crypto.createHash('md5')
//     var pwd = md5.update(req.body.pwd).digest('hex');

//     var newUser = {
//         name: req.body.name,
//         pwd: pwd,
//         email: req.body.email
//     }

//     User.get(name, function (err, user) {
//         if (user) {
//             req.flash('error', '用户已存在');
//             return res.redirect('/reg');
//         }

//         newUser.save(function (err, user) {
//             if (err) {
//                 req.flash('err', err);
//                 return res.redirect('/reg');
//             }
//             req.session.user = user;
//             req.flash('success', '注册成功');
//             req.redirect('/');
//         })
//     })
// })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reg', { title: 'reg' });
});


module.exports = router;
