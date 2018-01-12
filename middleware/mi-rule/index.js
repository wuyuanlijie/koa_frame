const Path = require('path');
const fs = require('fs');

module.exports = opts => {
  let { app, rules =[] } = opts;
  if (!app) {
    throw new Error('the app params is necessary')
  }
  // 提取app实例对象中的属性名
  const appKeys = Object.keys(app);
  rules.forEach(item => {
    let { path, name } = item;
    // 如果app 实例中的已经存在传入过来的属性名，则抛出错误
    if (appKeys.includes(name)) {
      throw new Error(`the name of ${name} already exists!`)
    }
    let content = {};
    // 读取指定文件夹下的dir 的所有的文件并遍历
    // readdirSync 返回一个包含“指定目录下所有的文件名称”的数组对象
    fs.readdirSync(path).forEach(filename => {
      // filename 是获取到文件的名字 home.js
      // 读取文件的后缀
      let extname = Path.extname(filename); // path.extname 返回文件的扩展名
      // 只处理js文件
      if (extname === '.js') {
        // 将文件的后缀名去掉
        let name = Path.basename(filename, extname);  // ext 是要过滤的字符
        // 读取文件中的内容并且赋值绑定
        content[name] = require(Path.join(path, filename))
      }
    });
    app[name] = content;
  })
}