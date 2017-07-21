var MongoClient = require('mongodb').MongoClient;
var expect = require('expect.js');

var url = 'mongodb://localhost:27017/myproject';

let connect = () => {
    // 知识点，这里要继续返回proimse
    return MongoClient.connect(url, {}).then(db => {
        db.close()
        return 123
    }).catch(err => {
        throw new Error(err);
    }); 
}

connect().then(db => {
    console.log(db)
})

// describe('mongodb单元测试', function () {
//     it ('链接是否正常', done => {
//        connect().then( db => {
//             expect(db).to.be.an('object')
//        })
//     })

    // it ('插入数据是否正常', done => {
        
    // })

    // it ('更新数据是否成功?', done => {
        
    // })

    // it ('删除数据是否成功?', done => {
       
    // })
// })






