var connect = require('./db').connect

class Publish {
    constructor (article) {
        this.name  = article.name
        this.title = article.title
        this.content  = article.content
    }

    save () {
        var date = new Date()
        const _time = {
            date   : date,
            year   : date.getFullYear(),
            month  : date.getFullYear() + '-' + (date.getMonth() + 1),
            day    : date.getFullYear() + '-' + (date.getMonth() + 1) + (date.getDate()),
            minute : date.getFullYear() + '-' + (date.getMonth() + 1) + (date.getDate()) + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        }
        return connect().then(db => {
            return (this.db = db).collection('article')
        }).then(docs => {
            return docs.insert({name: this.name, title: this.title, content: this.content, time: _time}, {safe: true})
        }).catch(err => {
            throw new Error(err)
        }).finally(() => {
            this.db && this.db.close()
        })
    }

    static get (name) {
        return connect().then(db => {
            return (this.db = db).collection('article')
        }).then(docs => {
            return docs.find({name: name}).sort({time: -1}).toArray()
        }).catch(err => {
            throw new Error(err)
        }).finally(cb => {
            this.db && this.db.close()
        })
    }

    static getOne (id) {
        return connect().then(db => {
            return (this.db = db).collection('article')
        }).then(docs => {
            return docs.findOne({_id: id})
        }).catch(err => {
            throw new Error(err)
        }).finally(cb => {
            this.db && this.db.close()
        })
    }
}

module.exports = Publish