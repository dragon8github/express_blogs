let connect = require('../models/db');
var expect = require('expect.js');

describe('mongodb-promise单元测试', function () {
    it ('链接是否正常', done => {
       connect().then( db => {
            expect(db).to.be.an('object');
            db.close();
            done();
       })
    })

    it ('插入数据是否正常', done => {
        connect().then( db => {
            return db.collection('documents')
        }) .then(docs => {
           return docs.insertMany([{a : 1}, {a : 2}, {a : 3}]) 
        }).then(result => {
            expect(result.result.n).to.equal(3)
            expect(result.ops.length).to.equal(3)
            done();
        }).catch(err => {
            throw new Error(err);
        })
    })

    it ('更新数据是否成功?', done => {
        connect().then( db => {
           return db.collection('documents')
        }) .then(docs => {
           return docs.updateOne({ a : 2 } , { $set: { b : 1 }})  
        }).then(result => {
            expect(result.result.n).to.be.equal(1);
            done();
        }).catch(err => {
            throw new Error(err);
        })
    })

    it ('删除数据是否成功?', done => {
       connect().then( db => {
           return db.collection('documents')
        }) .then(docs => {
           return docs.deleteOne({ a : 3 })
        }).then(result => {
            expect(result.result.n).to.be.equal(1);
            done();
        }).catch(err => {
            throw new Error(err);
        })
    })
})






