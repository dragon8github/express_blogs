var express = require('express')
var router = express.Router()
var fs = require('fs')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post('/', multipartMiddleware, function (req, res, next) {
    for (var i in req.files) {
      if (req.files[i].size == 0) {
          fs.unlinkSync(req.files[i].path);
      } else {
          var target_path = __dirname + '/../upload/' + req.files[i].name;
          fs.renameSync(req.files[i].path, target_path);
      }
      req.flash('success', '上传成功');
      res.redirect('/upload');
    }
})

router.get('/', function (req, res, next) {
    res.render('upload', { 
       title: "list",
       user: req.session.user,
       success: req.flash('success').toString(),
       error: req.flash('error').toString()
    })
})

module.exports = router