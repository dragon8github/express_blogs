var express = require('express');
var router = express.Router();
var Publish = require('../models/publish')

router.get('/', function (req, res, next) {
    Publish.get(req.session.user).then(article => {
        res.render('list', { 
           title: "list",
           user: req.session.user,
           success: req.flash('success').toString(),
           error: req.flash('error').toString(),
           list:article
        })
    })
})

module.exports = router;