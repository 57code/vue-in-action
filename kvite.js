const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const path = require('path')
const compilerSfc = require('@vue/compiler-sfc')
const compilerDom = require('@vue/compiler-dom')
app.use(async ctx => {
  const { url, query } = ctx.request
  console.log("url:" + url, "query type", query.type);
  if (url === '/') {
    ctx.type = 'text/html'
    ctx.body = fs.readFileSync('./index.html', 'utf-8')
  } else if (url.endsWith('.js')) {
    // 获取js文件绝对路径，读取并返回
    const p = path.join(__dirname, url)
    ctx.type = 'text/javascript'
    // 读取的js文件内容
    const ret = fs.readFileSync(p, 'utf-8')
    // 重写裸模块导入部分
    ctx.body = rewriteImport(ret)
  } else if (url.startsWith('/@modules')) {
    // 模块名称
    const moduleName = url.replace('/@modules/', '')
    // 获取模块绝对路径
    const prefix = path.resolve(__dirname, 'node_modules', moduleName)
    // 获取package.json中的module定义
    const module = require(prefix + '/package.json').module
    // 加载目标文件
    const filePath = path.join(prefix, module)
    const ret = fs.readFileSync(filePath, 'utf8')
    ctx.type = 'text/javascript'
    ctx.body = ret
  } else if (url.indexOf('.vue') > -1) {
    // 解析单文件组件相当于vue-loader做的事情
    // 转换script部分：将默认导出的组件对象转换为常量
    const p = path.resolve(__dirname, url.split("?")[0].slice(1));
    const ret = compilerSfc.parse(fs.readFileSync(p, 'utf-8'))

    if (!query.type) {
      // 获取脚本部分内容
      const scriptContent = ret.descriptor.script.content
      // 转换内容中默认导出为一个常量，这样可以继续编辑它
      const script = scriptContent.replace(
        'export default ',
        'const __script = ',
      )
      // 返回给用户App.vue解析结果
      ctx.type = 'text/javascript'
      ctx.body = `
        // script中import仍需要重写
        ${rewriteImport(script)}
        // 注意此时并只解析了script部分，template部分转换为另一次请求单独处理
        // 为了能够和SFC请求区分，后面额外加上查询参数type=template
        import { render as __render } from '${url}?type=template'
        __script.render = __render
        export default __script
      `
    } else if (query.type === 'template') {
      // 获取模板部分内容
      const template = ret.descriptor.template.content
      // 编译该模板为render函数
      const render = compilerDom.compile(template, { mode: 'module' }).code
      ctx.type = 'text/javascript'
      // 注意render中也有导入，需要重写import
      ctx.body = rewriteImport(render)
    }
  }
})

function rewriteImport(content) {
  // 将传入内容中裸模块导入部分替换为/@modules/xx形式
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
    // s0-待匹配字符串，s1-匹配的分组
    console.log(s0, s1)
    // 返回要替换的内容
    // 如果不是以. ../ /开头
    // 就是裸模块导入，替换这些path
    if (s1.startsWith('.') || s1.startsWith('/') || s1.startsWith('../')) {
      // 相对路径不做处理
      return s0
    } else {
      return ` from '/@modules/${s1}'`
    }
  })
}

app.listen(3000, () => {
  console.log('kvite start')
})
