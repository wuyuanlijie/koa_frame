// index.js 用来集中的调用所有中间价
// app.js中间价都迁移到middleware文件中来，方便后期的维护
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const path = require('path');
const ip = require('ip');

const koaStatic = require('koa-static');
const miLog = require('./mi-log'); // 中间件的日志
const miSend = require('./mi-send');
const miHttpError = require('./mi-http-error');
const miRule = require('./mi-rule');

module.exports = app => {

  // 引入规则中间件
  /**
   * 在接口开头调用
   * 指定 controller 文件夹下的 js 文件，挂载在 app.controller 属性
   * 指定 service 文件夹下的 js 文件，挂载在 app.service 属性
   */
  miRule({
    app,
    rules: [
      {
        path: path.join(__dirname, '../controller'),
        name: 'controller'
      },
      {
        path: path.join(__dirname, '../service'),
        name: 'service'
      }
    ]
  })


  // 自定义错误文件的目录， app.use() 传入的参数必须是一个函数
  app.use(miHttpError({
    errorPageFolder: path.resolve(__dirname, '../errorPage')
  })) //应用请求错误的中间件


  // app.env 默认是NODE_ENV 或者是development
  app.use(miLog(app.env, {
    // 将配置中间件的参数在 注册中间件时候 作为参数传入
    env: app.env, // koa 提供的环境变量
    projectName: 'koa2_lijie',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address(),
  }));
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),  // 指定视图的目录  __dirname 是当前文件所在的地址 
    nunjucksConfig: {
      timeBlocks: true //开启转义 防止XSS
    }
  }))
  app.use(koaStatic(path.resolve(__dirname, '../public'))); // ./public  public
  app.use(bodyParser());
  app.use(miSend());

  // 中间件的处理 也会存在异常，在最外层做一个错误的监听
  app.on("error", (ctx, next) => {
    if (ctx && ctx.headerSent && ctx.status < 500) {
      ctx.status = 500;
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}