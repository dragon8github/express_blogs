var MongoClient = require('mongodb').MongoClient;
var expect = require('expect.js');


let connect = function (cb) {
    var url = 'mongodb://localhost:27017/myproject';
    MongoClient.connect(url, function(err, db) {
        expect(err).to.equal(null)
        cb && cb(db)
    }); 
}

describe('mongodb单元测试', function () {
    it ('链接是否正常', done => {
        connect(db => {
            db.close();
            done();
        })
    })

    it ('插入数据是否正常', done => {
        connect(db => {
            var collection = db.collection('documents');
              collection.insertMany([
                {a : 1}, {a : 2}, {a : 3}
              ], function(err, result) {
                expect(err).to.equal(null)
                expect(result.result.n).to.equal(3)
                expect(result.ops.length).to.equal(3)
                db.close();
                done();
              });
        })
    })

    it ('更新数据是否成功?', done => {
        connect(db => {
            var collection = db.collection('documents');
            collection.updateOne({ a : 2 }
                , { $set: { b : 1 } }, function(err, result) {
                    expect(err).to.equal(null)
                    expect(result.result.n).to.be.equal(1);
                    done();
              });  
        })
    })

    it ('删除数据是否成功?', done => {
        connect(db => {
            var collection = db.collection('documents');
            collection.deleteOne({ a : 3 }, function(err, result) {
                expect(err).to.equal(null)
                expect(result.result.n).to.be.equal(1);
                done();
            });
        })
    })
})






