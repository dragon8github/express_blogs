// node-mongodb-native
var MongoClient = require('mongodb').MongoClient
// 数据库配置文件
let conf = require('../config').db

// 这个需要好好学学.挺实用的
Promise.prototype.finally = function (callback) {
    // 返回对创建此对象的数组函数的引用。也就是Promise对象本身
    let P = this.constructor
    // 返回一个人工promise
    return this.then(
        // 如果上个promise是成功的，那么先按照Promise的套路执行回调函数，再返回上一个返回值promise
        ret => P.resolve(callback()).then(() => {
            return ret
        }),
        // 捕捉错误
        err => P.resolve(callback()).then(() => {
            throw new Error(err) 
        })
    );
};

// 一个简单的链接串
let connect = () => {
    return MongoClient.connect(conf.url).then(db => db)
}

module.exports = {
    connect
}