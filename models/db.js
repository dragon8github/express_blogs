var conf = require('../config').db
var Db = require('mongodb').Db
var Connection = require('mongodb').Connection
var Server = require('mongodb').Server

console.log(Connection)

module.exports = new Db(conf.db, new Server(conf.host, Connection.DEFAULT_PORT), {safe: true})