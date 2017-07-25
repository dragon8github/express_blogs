var collections = require('./db').collections;

class User {
    constructor (user) {
        this.name = user.name
        this.pwd = user.pwd
        this.email = user.email
    }

    save () {
        return collections('users').then(docs => {
            return docs.insert({name: this.name, pwd: this.pwd, email: this.email}, {safe: true})
        }).then(user => {
            return user
        }).catch(err => {
            throw new Error(err)
        }).finally(() => {
            this.db && this.db.close()
        })
    }

    static get (name) {
        return collections('users').then(docs => {
            return docs.findOne({name: name})
        }).then(user => {
            return user
        }).catch(err => {
            throw new Error(err)
        }).finally(() => {
            this.db && this.db.close()
        })
    }
}

module.exports = User