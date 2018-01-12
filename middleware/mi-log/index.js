const logger = require('./logger');

// 对中间件里面的错误，捕捉异常并且处理；
module.exports = (options) => {
  const loggerMiddleware = logger(options);

  return (ctx, next) => {
    return loggerMiddleware(ctx, next)
        .catch(e => {
          // 将状态码小于500的错误统一的按照500错误码来处理
          if (ctx.status < 500) {
            ctx.status = 500;
          }
          ctx.log.error(e.stack);
          ctx.state.logged = true;
          ctx.throw(e);
        })
  }
}