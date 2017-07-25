var Publish = require('../models/publish')
var expect = require('expect.js')

describe('User测试', () => {
    let publish = new Publish({name: "Lee", title: "title", body: "body"})

    it ('测试save()函数能否成功添加文章', done => {
        publish.save().then(article => {
            expect(article.result.n).to.be.equal(1);   
            expect(article.insertedCount).to.be.equal(1);
            done();  
        }).catch(err => {
            throw new Error(err);
        })
    })

    it ('测试get()函数能否正常获取到文章信息', done => {
        Publish.get('Lee').then(article => {
            expect(article.length).to.be.above(0)
            done();
        }).catch(err => {
            throw new Error(err);
        })
    })
})