// 将路由对应的业务逻辑分离出来
// 将每个路由的处理逻辑分离到controller下面来，便于后期的维护

module.exports = {
  index: async (ctx, next) =>  {
    console.log(ctx.params); // {name: 'lijie', age: '23'}
    await ctx.render("home/index", { title: "李杰欢迎你" })
  },
  home: async (ctx, next) => {
    console.log(ctx.request.query);
    console.log(ctx.request.query);
    ctx.response.body = `<h1>这是家乡</h1>`
  },
  homeParams: async (ctx, next) => {
    console.log(ctx.params);
    ctx.response.body = '<h1>Home Page /:id/:name</h1>';
  },
  login: async (ctx, next) => {
    await ctx.render('home/login', {
      btnName: '登陆！！',
    })
  },
  register: async (ctx, next) => {
    // 从ctx上下文环境中 解构出app
    // ctx 存在属性request、response、app、originalUrl、
    let { app } = ctx;
    // post请求的获取的结果 ctx.request.body
    let { name, password } = ctx.request.body;

    let res = await app.service.home.register(name, password);
    if (res.status === -1) {
      await ctx.render("home/login", res.data);
    } else {
      ctx.state.title = '个人中心';
      await ctx.render("home/success", res.data);
    }
  }


}