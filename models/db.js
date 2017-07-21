var MongoClient = require('mongodb').MongoClient;

let connect = function (cb) {
    var url = 'mongodb://localhost:27017/myproject';
    MongoClient.connect(url, function(err, db) {
        if (err) return cb && cb(err)
        cb && cb(null, db)
    }); 
}

module.exports = connect