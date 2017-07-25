var connect = require('./db');

class Publish {
    constructor (article) {
        this.name = article.name
        this.title = article.title
        this.body = article.body
    }

    save () {
        var date = new Date();
        const _time = {
            date  : date,
            year  : date.getFullYear(),
            month : date.getFullYear() + '-' + (date.getMonth() + 1),
            day   : date.getFullYear() + '-' + (date.getMonth() + 1) + (date.getDate()),
            minute: date.getFullYear() + '-' + (date.getMonth() + 1) + (date.getDate()) + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        }
       return connect().then(db => {
            this.db = db
            return db.collection('article')
        }).then(docs => {
            return docs.insert({name: this.name, title: this.title, body: this.body, time: _time}, {safe: true})
        }).then(article => {
            this.db && this.db.close()
            return article
        }).catch(err => {
            this.db && this.db.close()
            throw new Error(err);
        })
    }

    static get (name) {
        return connect().then(db => {
             this.db = db
             return db.collection('article')
         }).then(docs => {
             return docs.find({name: name}).sort({time: -1}).toArray()
         }).then(article => {
            return article
         }).catch(err => {
            throw new Error(err);
         }).finally(cb => {
            this.db && this.db.close()
         })
    }
}

module.exports = Publish;