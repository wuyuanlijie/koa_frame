//  设置对应的中间价 把数据挂载带响应体的body上， 并且告诉客户端返回的是json数据

module.exports = () => {
  function render (json) {
    this.set('Content-Type', 'application/json');
    this.body = JSON.stringify(json);
  }
  // 将json的数据挂在到ctx对象上面，并且起名为send
  // crx.send
  return async (ctx, next) => {
    ctx.send = render.bind(ctx);
    // 调用ctx上的log方法下的error方法打印日志 
    ctx.log.error('ikcamp');
    await next();
  }
}