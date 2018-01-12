module.exports = (ctx, message, commonInfo) => {
  const {
    method,  // 请求方法 get post
    url,    // 请求的链接
    host,   // 发送请求的客户端
    headers,  // 请求的头部headers
  } = ctx.request;

  const client = {
    method,
    url,
    host,
    message,
    referer: headers['referer'], // 请求的原源地址
    userAgent: headers['user-agent'],  // 客户端的信息 设备以及浏览器的信息
  }
  return JSON.stringify(Object.assign(commonInfo, client));
}