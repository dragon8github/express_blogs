var User = require('../models/user')
var expect = require('expect.js');

describe('User测试', () => {
    let user = new User({name: "Lee", pwd: "123456", email: "123@qq.com"})

    it ('测试save函数是否添加用户成功', done => {
        user.save().then(user => {
            expect(user.result.n).to.be.equal(1);   
            expect(user.insertedCount).to.be.equal(1);   
            done();
        }).catch(err => {
            throw new Error(err);
        })
    })

    it ('测试是否能正常获取到用户', done => {
        User.get('Lee').then(user => {
            expect(user.name).to.be.equal('Lee');
            expect(user.pwd).to.be.equal('123456');
            expect(user.email).to.be.equal('123@qq.com');
            done();
        }).catch(err => {
            throw new Error(err);
        })
    })
})