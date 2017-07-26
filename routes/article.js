var express = require('express');
var router = express.Router();
var Publish = require('../models/publish')

router.get('/:id', function (req, res, next) {
    Publish.getOne(req.params.id).then(article => {
        res.render('article', { 
           title: "article",
           user: req.session.user,
           success: req.flash('success').toString(),
           error: req.flash('error').toString(),
           article:article
        })
    }).catch(err=> {
        res.send('err' + JSON.stringify(err))
    })
    
})

module.exports = router;