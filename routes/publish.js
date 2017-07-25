var express = require('express');
var router = express.Router();
var Publish = require('../models/publish')

router.post('/', function (req, res, next) {
    var name = req.body.name
    var title = req.body.title
    var body = req.body.body

    // 实例化User类对象
    var publish = new Publish({name, title, body})

    // 保存文章信息
    publish.save().then(article => {
        req.session.article = article;
        req.flash('success', '发布成功');
        res.redirect('/');
    })
})

router.get('/', function (req, res, next) {
    res.render('publish', { title: "publish" })
})

module.exports = router;