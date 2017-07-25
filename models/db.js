var MongoClient = require('mongodb').MongoClient;
let conf = require('../config').db;

// 这个需要好好学学
Promise.prototype.finally = function (callback) {
    let P = this.constructor; // 返回对创建此对象的数组函数的引用。也就是Promise对象本身
    return this.then(
        ret => P.resolve(callback()).then( () => {
            console.log("我是ret", ret);
            return ret;
        }),
        err => P.resolve(callback()).then( () => {throw new Error(err) })
    );
};
module.exports = () => {
    return MongoClient.connect(conf.url).then(db => db).catch(err => {
        throw new Error(err);
    }); 
}