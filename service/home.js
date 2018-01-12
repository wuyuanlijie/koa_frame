// service 用户处理数据层面的交互 调用model来处理数据库 调用第三方的接口等等
module.exports = {
  register: async (name, password) => {
    let result; 
    if (name === 'lijie' && password === '123') {
      console.log('登陆成功！！')
      result = {
        status: 0,
        data: {
          title: '个人中心',
          content: '欢迎进入个人中心',
        }
      }
    } else {
      result = {
        status: -1,
        data: {
          title: '登陆失败',
          content: '请输入正确的账号信息'
        }
      }
    }
    return result;
  }
}