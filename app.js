const Koa = require('koa');
const app = new Koa();
const router = require('./routes');

const middleware = require('./middleware');


middleware(app);

// middleware中间件的原理
// 每接受一个http请求，都会调用这个函数
// ctx 作为上下文来使用，ctx.request ctx.response 获取请求url ctx.url 简写ctx.request.url
// next 参数的作用是将处理得控制权转交给下一个中间件，而next() 的代码，将会在下一个中间件以及后面得中间件执行结束后再执行。

// 日志的分类
// 日志可分为访问日志和应用日志。访问的日志一般记录客户端对项目访问，主要是http的请求。 
// 应用日志是项目中需要特殊的标记和记录的位置打印的日志，包括出现的异常的情况。 debug info warn error等级别
router(app);

app.listen(4000, () => {
  console.log(`Server is running at port 4000`);
})