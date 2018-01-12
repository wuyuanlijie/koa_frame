const router = require('koa-router')({
  // prefix: '/user' // 路由前缀
});

module.exports = app => {
  router.get('/', app.controller.home.index);
  router.get('/home', app.controller.home.home);
  router.get('/home/:id/:name', app.controller.home.homeParams);
  router.get('/user', app.controller.home.login);
  router.post('/user/register', app.controller.home.register);
  app.use(router.routes()).use(router.allowedMethods());
}






// // app.use(async (ctx, next) => {
// //   await next(); // 如果没有调用await next() 后面的中间件将不在会执行（反而直接向上返回得去执行）
// //   ctx.state.name = "jerrylee" // 中间件的存储空间
// //   ctx.response.type = 'text/html';
// //   ctx.response.body = '<h1>hello world!!!</h1>'
// //   console.log(ctx.url) // ctx.request.path获取请求的路径
// //   console.log(ctx.path)
// // })

// // get post put del all
// router.get('/', async (ctx, next) => {
//   // ctx.params访问路由中的参数
  
// })
// router.get('/home', async (ctx, next) => {
  
// })

// router.url('user', { id: 3 }); // 生成路由 /user/3

// // router.use((ctx, next) => {
// //   // 路由重定向为/home 得页面
// //   // ctx.router.url 根据路由名称和参数去生成具体得url
// //   ctx.redirect(ctx.router.url('/home'));
// // })

// // 如何解决http得请求 get post
// router.get('/test', async (ctx, next) => {
//   // 这个是直接获取到get请求
//   console.log(ctx.request.query); // 但是这个是返回得对象
//   console.log(ctx.request.querystring); // 这个是返回得字符串
//   ctx.response.body = '<h1>测试得首页</h1>'
// })

// // 请求得参数放在url得中间
// router.get('/page/:id/:name', async (ctx, next) => {
//   console.log(ctx.params); // 返回得是对象
//   ctx.response.body = '<h1>Page page /:id/:name</h1>'
// })

// router.post('/user/register', async (ctx, next) => {
//   let { name, password } = ctx.request.body;
//   if (name === 'lijie' && password === '123') {
//     ctx.response.body = `hello! ${name}`
//   } else {
//     ctx.response.body = '请输入正确的账号信息。'
//   }
// })



// // * 是代表通配符所有得路径 如果不存在声明都router，那么都是返回404不存在的页面
// router.get('/*', async (ctx, next) => {
//   console.log(ctx.path);
//   ctx.response.status = 404;
//   ctx.response.body = `<h1>404 Not Found</h1>`
// })


