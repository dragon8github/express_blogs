var connect = require('./db');

class User {
    constructor (user) {
        this.name = user.name
        this.pwd = user.pwd
        this.email = user.email
    }

    save () {

       return connect().then(db => {
            this.db = db
            return db.collection('users')
        }).then(docs => {
            return docs.insert({name: this.name, pwd: this.pwd, email: this.email}, {safe: true})
        }).then(user => {
            this.db.close()
            return user
        }).catch(err => {
            throw new Error(err);
        })
    }

    static get (name) {
        return connect().then(db => {
             return db.collection('users')
         }).then(docs => {
             return docs.findOne({name: name})
         }).then(user => {
            this.db.close()
            return user
         }).catch(err => {
            throw new Error(err);
        })
    }
}

module.exports = User;