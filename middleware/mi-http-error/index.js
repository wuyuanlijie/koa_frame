// 利用http-error中间件来捕捉异常 根据错误码状态 调用渲染的页面的逻辑
const path = require('path');
const nunjucks = require('nunjucks');

module.exports = (opts = {}) => {
  // 增加环境变了，用来传入到视图中，方便调试
  const env = opts.env || process.env.NODE_ENV || 'development';
  // 404 400 other.html的存放的位置
  const folder = opts.errorPageFolder;
  // 指定默认的模版文件
  const templatePath = path.resolve(__dirname, './error.html');
  let fileName = 'other';

  return async (ctx, next) => {
    try {
      await next();
      // koa 默认的status是404
      if (ctx.response.status === 404 && !ctx.response.body) {
        ctx.throw(404);
      }
    } catch(e) {
      let status = parseInt(e.status);
      // 默认错误信息error对象的上携带message
      const message = e.message
      
      if (status >= 400) { 
        // 不同情况 会显示不同的错误的页面 400 404 500 其他的错误都是500
        switch(status) {
          case 400:
          case 404:
          case 500:
            fileName = status;
            break;
          // 其他的错误 指定渲染的other的文件
          default: 
            fileName = 'other'
        }
      } else {
        status = 500;
        fileName = status;
      }
      // 确定最终的filePath的路径
      const filePath = folder ? path.join(folder, `${fileName}.html`) : templatePath;

      // 渲染对应的错误类型的视图，并且传入参数对象
      try {
        // 指定视图路径
        nunjucks.configure(folder ? folder : __dirname);
        const data = await nunjucks.render(filePath, {
          env: env, // 指定当前环境参数
          status: e.status || e.message, 
          error: e.message, //错误的信息
          stack: e.stack,
        })
        // 赋值给响应体  ctx.response.body === ctx.body
        ctx.status = status;
        ctx.body = data;
      } catch (e) {
        // 如果中间件存在异常的错误，直接抛出信息，由其他的中间件处理
        ctx.throw(500, `页面渲染失败：${e.message}`);
      } 
    }
  }
}