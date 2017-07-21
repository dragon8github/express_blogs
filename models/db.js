var MongoClient = require('mongodb').MongoClient;
let conf = require('../config').db;
module.exports = () => {
    return MongoClient.connect(conf.url, {}).then(db => db).catch(err => {
        throw new Error(err);
    }); 
}