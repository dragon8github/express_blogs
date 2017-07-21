var conf = require('../config').db
var Db = require('mongodb').Db
var Connection = require('mongodb').Connection
var Server = require('mongodb').Server

module.exports = new Db(conf.db, new Server(conf.host, 27010), {safe: true})