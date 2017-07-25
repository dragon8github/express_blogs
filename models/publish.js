var collections = require('./db').collections

class Publish {
    constructor (article) {
        this.name  = article.name
        this.title = article.title
        this.body  = article.body
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
        return collections('article').then(docs => {
            return docs.insert({name: this.name, title: this.title, body: this.body, time: _time}, {safe: true})
        }).catch(err => {
            throw new Error(err)
        }).finally(() => {
            this.db && this.db.close()
        })
    }

    static get (name) {
        return collections('article').then(docs => {
            return docs.find({name: name}).sort({time: -1}).toArray()
         }).catch(err => {
            throw new Error(err)
         }).finally(cb => {
            this.db && this.db.close()
         })
    }
}

module.exports = Publish