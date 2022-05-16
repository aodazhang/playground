/**
 * @description webpack5多页应用定义文件
 * @author aodazhang 2022.05.16
 * @extends https://webpack.docschina.org/configuration/
 */
const path = require('path')

// 一.路径变量
/** 构建输出路径（用于webpack打包输出目录） */
const outputPath = path.resolve(__dirname, 'dist')
/** html模板路径（用于htmlWebpackPlugin指定模板） */
const templatePath = path.resolve(__dirname, 'template')
/** 公共资源路径（用于copyWebpackPlugin复制目录） */
const publicPath = path.resolve(__dirname, 'public')

// 二.webpack变量
/** 构建入口文件名 */
const entryFile = 'index'
/** 生成文件名hash规则 */
const hashRule = '[name]_[contenthash:8]'
/** 路径别名：js -> '@/'、css -> '~@/' */
const alias = {
  '@tool': path.resolve(__dirname, 'tool'),
  '@app-car': path.resolve(__dirname, 'app-car'),
  '@app-three': path.resolve(__dirname, 'app-three'),
  '@app-v3': path.resolve(__dirname, 'app-v3'),
  '@app-visualization': path.resolve(__dirname, 'app-visualization'),
  crypto: false // webpack5中移除了nodejs核心模块的polyfill自动引入，需要手动引入
}
/** webpack注入全局变量 */
const definePlugin = {
  PROJECT_ENV: JSON.stringify(process.env.NODE_ENV), // 项目环境
  PROJECT_VERSION: JSON.stringify(require('./package.json').version), // 项目版本号
  PROJECT_BUILDTIME: JSON.stringify(`${new Date()}`), // 项目构建时间
  __VUE_OPTIONS_API__: false, // vue3关闭 options api：https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
  __VUE_PROD_DEVTOOLS__: false // vue3在生产环境中禁用 devtools 支持
}
// webpack-dev-server配置
const devServer = {
  port: 3000 // 端口号
}

// 三.webpack控制
/** 是否开启css模块化 */
const isCssModules = false
/** 是否生产环境开启source map */
const isSourceMap = false
/** 是否生产环境移除console */
const isDropConsole = false

module.exports = {
  outputPath,
  templatePath,
  publicPath,
  entryFile,
  hashRule,
  alias,
  definePlugin,
  devServer,
  isCssModules,
  isSourceMap,
  isDropConsole
}
