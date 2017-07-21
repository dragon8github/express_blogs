var mongodb = require('./db');

function User (user) {
    this.name = user.name
    this.pwd = user.pwd
    this.email = user.email
}

User.prototype.save = function (cb) {
    mongodb.open((err, db) => {
        if (err) { return cb(err); }
        db.collection('users', (err, collection) => {
            if (err) { mongodb.close(); return cb(err); }
            collection.insert({name: this.name, pwd: this.pwd, email: this.email}, {safe: true}, (err, user) => {
                mongodb.close();
                if (err) return cb(err);
                cb(null, user[0]);
            })
        })
    })
}

User.get = (name, cb) => {
    mongodb.open((err, db) => {
        if (err) { return cb(err); }
        db.collection('users', (err, collection) => {
            if (err) { mongodb.close(); return cb(err); }
            collection.findOne({name: name}, (err, user) => {
                mongodb.close();
                if (err) return cb(err);
                cb(null, user);
            })
        })
    })
}