var User = require('../models/user')
var expect = require('expect.js');

let user = new User({name: "Lee", pwd: "123456", email: "123@qq.com"})
user.save().then(data=>{
    console.log(data);
}).catch(err=>{
    console.log('123', err)
})

// describe('User测试', () => {
//     let user = new User({name: "Lee", pwd: "123456", email: "123@qq.com"})

//     it ('测试save()函数能否成功添加用户', done => {
//         user.save().then(_user => {
//             expect(_user.result.n).to.be.equal(1);   
//             expect(_user.insertedCount).to.be.equal(1);   
//             done();
//         }).catch(err => {
//             throw new Error(err);
//         })
//     })

//     it ('测试get()函数能否正常获取到用户信息', done => {
//         User.get('Lee').then(_user => {
//             expect(_user.name).to.be.equal('Lee');
//             expect(_user.pwd).to.be.equal('123456');
//             expect(_user.email).to.be.equal('123@qq.com');
//             done();            
//         }).catch(err => {
//             throw new Error(err);
//         })
//     })
// })