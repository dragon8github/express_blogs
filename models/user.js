var connect = require('./db');

class User {
    constructor (user) {
        this.name = user.name
        this.pwd = user.pwd
        this.email = user.email
    }

    save () {
        return connect().then(db => {
            return (this.db = db).collection('users')
        }).then(docs => {
            return docs.insert({name: this.name, pwd: this.pwd, email: this.email}, {safe: true})
        }).catch(err => {
            throw new Error(err);
        }).finally(() => {
            this.db && this.db.close();
        })
    }

    static get (name) {
        return connect().then(db => {
            return (this.db = db).collection('users')
        }).then(docs => {
            return docs.findOne({name: name})
        }).catch(err => {
            throw new Error(err);
        }).finally(() => {
            this.db && this.db.close()
        })
    }
}

module.exports = User;