const log4js = require('log4js');
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];
const access = require('./access.js');

// 设置默认公用参数对象
const baseInfo = {
  appLogLevel: 'debug', // 指定记录的日志级别
  dir: 'logs',  //指定日志的存放目录名
  env: 'env', // 指定当前的环境 当为开发环境时，在控制台也输出， 方便调试
  projectName: 'koa2-ikcamp', // 项目的名字
  serverIp: '0.0.0.0', // 默认情况下 服务器的ip地址
}

module.exports = (options) => {
  const contextLogger = {};
  const appenders = {};

  // 继承自baseInfo 默认参数 
  const opts = Object.assign({}, baseInfo, options || {});

  const { env, appLogLevel, dir, serverIp, projectName } = opts;
  // 增加常量，用来存储公用的日志的信息
  const commonInfo = { projectName, serverIp };

  appenders.cheese = {
    type: 'dateFile',  // 展示方式为文件的类型 file
    filename: 'logs/task', // 日志输出的文件名
    pattern: '-yyyy-MM-dd.log',  // 文件名后添加后缀
    alwaysIncludePattern: true, // 是否总是有后缀名
  }
  // 环境变量为 dev local development 是开发的环境
  if (env === "dev" || env === "local" || env === "development") {
    appenders.out = {
      type: 'console'
    }
  }
  let config = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: appLogLevel
      }
    }
  }

  const logger = log4js.getLogger('cheese');

  return async (ctx, next) => {
    // 记录开始的时间 
    const start = Date.now();

    log4js.configure(config);
    methods.forEach((method, i) => {
      contextLogger[method] = message => {
        logger[method](access(ctx, message, commonInfo))
      }
    })
    ctx.log = contextLogger;
    await next();
    const responseTime = Date.now() - start;
    logger.info(access(ctx, {
      '响应时间': `${responseTime/1000}s`
    }, commonInfo))
  }
}