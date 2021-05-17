# BFF 架构初测

## BFF架构解释

1. ```什么是BBF:```BFF，即 Backend For Frontend（服务于前端的后端）。也就是服务器设计 API 时会考虑前端的使用，并在服务端直接进行业务逻辑的处理。
2. ```BBF使用姿势:```
    1. ```多端应用:```我们在设计 API 时会考虑到不同设备的需求，也就是为不同的设备提供不同的 API，虽然它们可能是实现相同的功能，但因为不同设备的特殊性，它们对服务端的 API 访问也各有其特点，需要区别处理。
    2. ```服务聚合:```随着微服务的兴起，原本在同一个进程内运行的业务流程被拆分到了不同的服务中。这在增加业务灵活性的同时，也让前端的调用变得更复杂。BFF 的出现为前端应用提供了一个对业务服务调用的聚合点，它屏蔽了复杂的服务调用链，让前端可以聚焦在所需要的数据上，而不用关注底层提供这些数据的服务。
    3. ```非必要，莫新增:```我们在看到 BFF 带来的各种好处的同时，也要注意到它所带来的代码重复和工作量增加方面的问题。如果与已有 BFF 功能类似，且展现数据的要求也相近的话，一定要谨慎对待新增 BFF 的行为。因此，建议非必要，莫新增。
3. ```实战中的玩法:```
    1. ```访问控制:```例如，服务中的权限控制，将所有服务中的权限控制集中在 BFF 层，使下层服务更加纯粹和独立。
    2. ```应用缓存:```项目中时常存在一些需要缓存的临时数据，此时 BFF 作为业务的汇聚点，距离用户请求最近，遂将该缓存操作放在 BFF 层。
    3. ```第三方入口:```在业务中需要与第三交互时，将该交互放在 BFF 层，这样可以只暴露必要信息给第三方，从而便于控制第三方的访问。

## BFF架构实践

### 项目选型

1. 基础框架选择：

   - web端: React + react-router + hooks
   - server端: Koa + koa-router
2. web端样式选择：

   - 预编译器 less。项目中使用了变量定义，选择器嵌套，选择器复用等，less 够用了。
   - 解决命名冲突可以使用 css modules，暂未考虑 css in js。
   - 使用 bem 命名规范。
   - 使用 postcss 插件 autoprefixer，增加 css 兼容性。
3. 构建工具选择：

      - webpack。内置 tree shaking，scope hosting 等，打包效率高，社区活跃。
   - webpack-merge 合并不同环境配置文件。
   - 配置 externals。引入 cdn 代替 node_modules 中体积较大的包。
   - gulp。用来打包 node 端代码。
4. 代码规范：

   - eslint。辅助编码规范执行，有效控制代码质量。同时也支持校验 typescript 语法。
   - 配置 eslint-config-airbnb 规则。
   - 配置 eslint-config-prettier 关闭和 prettier 冲突的规则。
5. 数据库选择：
   - mysql

### 搭建基础环境

#### 前端环境集成

1. webpack环境搭建：

   - 由于不同环境的打包方式并不相同，这里抽象出开发环境、上线环境、优化环境的配置文件，使用 webpack-merge 合并配置文件。
   - 配置 css 预处理器，使用 less-loader。
    - 配置 url-loader，打包项目中的图片资源。
    - 配置 html-webpack-plugin 将最后生成的 js，css，注入 html 中。
    - 开发环境配置，使用开箱即用的 webpack-dev-server。

2. 编写package.json中script脚本（最终效果如下(含服务端)）：

   ``` json
   "scripts": {
       "dev:web": "cross-env NODE_ENV=development webpack serve",
       "prod:web": "cross-env NODE_ENV=production webpack",
       "dev:server": "cross-env NODE_ENV=development gulp",
       "prod:server": "cross-env NODE_ENV=production gulp",
       "dev:start": "cross-env NODE_ENV=development supervisor -i ./dist/web/ -w ./dist/ ./dist/app.js",
       "dev": "npm-run-all --parallel dev:web dev:server dev:start",
       "build": "npm-run-all --parallel prod:web prod:server"
   },
   ```

3. 最终代码结构目录：

   ```js
   // 这里只展示web层目录
   ├── apiUrl.js
   ├── components
   │   ├── Author.js
   │   └── IndexHeader.js
   ├── defaultUrl.js
   ├── index.js
   ├── layout
   │   ├── Admin.js
   │   └── Index.js
   ├── pages
   │   ├── ArticleAdd.js
   │   ├── ArticleList.js
   │   ├── Index.js
   │   ├── LeavingAMessage.js
   │   ├── List.js
   │   ├── Login.js
   │   ├── Menu.js
   │   └── detail.js
   ├── routes.js
   └── style
       ├── AddArticle.less
       ├── ArticleList.less
       ├── Detail.less
       ├── Header.less
       ├── Index.less
       ├── adminIndex.less
       └── login.less
   ```

   

#### 服务端集成

1. 最终目录展示：

   ``` js
   // 这里展示server层目录
   ├── app.js
   ├── config
   │   └── index.js
   ├── controller
   │   ├── BackendController.js
   │   └── IndexController.js
   ├── db
   │   └── mysqlHelper.js
   ├── exception
   │   └── ErrorHandler.js
   └── utils
       └── R.js
   ```

2. ErrorHander.js:对前端访问不存在路由返回404和其他错误处理。

3. R.js：抽象接口返回类，详情如下：

   ```js
   const constant = {
       SUCESS_CODE: 200,
       ERROR_CODE: -1
   }
   
   class R {
       constructor() {
           this.code = null;
           this.msg = null;
           this.data = null
       }
   
       ok (ctx, data = this.data, msg = this.msg, code = constant.SUCESS_CODE) {
           return ctx.body = {
               code,
               msg,
               data
           }
       }
   
       notOk (ctx, msg, code = constant.ERROR_CODE) {
           return ctx.body = {
               code,
               msg
           }
       }
   }
   module.exports = R
   ```

   使用：

   ```js
   import Result from "../utils/R"
   
   router.get('/',async ctx=>{
     //省略部分代码
     R.ok(ctx, data, "获取成功")
   })
   
   ```

4. 路由处理：

   ```js
   router
   	.get("/getdata", async ctx=>{
     	//todo 
   	})
   	.get(["/", "/login", "/admin", "/admin/(.*)"], ctx => {  // 对前端访问的路由处理，映射到静态目录
           const file = fs.readFileSync(path.resolve(__dirname, "../web/index.html"));
           console.log("--->", file)
           ctx.set('Content-Type', 'text/html; charset=utf-8');
           ctx.body = file;
       })
   ```

5. 前后端交互采用token作为识别，这里采用koa-session：

   ```js
   const CONFIG = {
       key: 'bffsecret',   //cookie key (default is koa:sess)
       maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
       overwrite: true,  //是否可以overwrite    (默认default true)
       httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
       signed: true,   //签名默认true
       rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
       renew: false,  //(boolean) renew session when session is nearly expired,
   };
   
   app.use(koaSession(CONFIG, app));
   ```

6. 日志打印：

   ```js
   // 错误日志记录
   log4js.configure({
       appenders: {
           globallog: {
               type: 'file',
               filename: './logs/globallog.log'
           }
       },
       categories: {
           default: {
               appenders: ['globallog'],
               level: 'debug'
           }
       }
   });
   
   const logger = log4js.getLogger('globallog');
   ErrorHander.init(app, logger);
   
   // 在ErrorHander.js中使用
   logger.error(JSON.stringify(e));
   ```

7. gulp打包配置：

   ```js
   const gulp = require('gulp');
   const babel = require('gulp-babel');
   
   gulp.task('build:js', () =>
     gulp
       .src('./src/server/**/*.js')
       .pipe(
         // 使用 .babelrc 配置
         babel()
       )
       .pipe(gulp.dest('./dist/'))
   );
   
   // 定义 default 任务
   gulp.task("default", gulp.series("build:js"));
   
   if (process.env.NODE_ENV !== 'production') {
     gulp.watch('./src/server/**/*.js', gulp.series('default'));
   }
   ```

### 总结

1. 项目中package.json：

   ```json
   {
     "name": "bff",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "dev:web": "cross-env NODE_ENV=development webpack serve",
       "prod:web": "cross-env NODE_ENV=production webpack",
       "dev:server": "cross-env NODE_ENV=development gulp",
       "prod:server": "cross-env NODE_ENV=production gulp",
       "dev:start": "cross-env NODE_ENV=development supervisor -i ./dist/web/ -w ./dist/ ./dist/app.js",
       "dev": "npm-run-all --parallel dev:web dev:server dev:start",
       "build": "npm-run-all --parallel prod:web prod:server"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "dependencies": {
       "@ant-design/icons": "^4.5.0",
       "@babel/core": "^7.13.10",
       "@babel/plugin-proposal-class-properties": "^7.13.0",
       "@babel/plugin-syntax-dynamic-import": "^7.8.3",
       "@babel/plugin-transform-runtime": "^7.13.10",
       "@babel/preset-env": "^7.13.10",
       "@babel/preset-react": "^7.12.13",
       "@babel/preset-typescript": "^7.13.0",
       "@typescript-eslint/eslint-plugin": "^4.19.0",
       "@typescript-eslint/parser": "^4.19.0",
       "antd": "^4.14.0",
       "autoprefixer": "^9.8.6",
       "axios": "^0.21.1",
       "babel-core": "^6.26.3",
       "babel-loader": "^8.2.2",
       "babel-plugin-import": "^1.13.3",
       "cross-env": "^7.0.3",
       "css-loader": "^5.1.3",
       "cssnano": "^4.1.10",
       "gulp": "^4.0.2",
       "gulp-babel": "^8.0.0",
       "highlight.js": "^10.6.0",
       "html-webpack-plugin": "^5.3.1",
       "koa": "^2.13.1",
       "koa-body": "^4.2.0",
       "koa-bodyparser": "^4.3.0",
       "koa-router": "^10.0.0",
       "koa-session": "^6.1.0",
       "koa-static": "^5.0.0",
       "less": "^4.1.1",
       "less-loader": "^8.0.0",
       "lodash": "^4.17.21",
       "log4js": "^6.3.0",
       "marked": "^2.0.1",
       "mini-css-extract-plugin": "^1.3.9",
       "mysql": "^2.18.1",
       "npm-run-all": "^4.1.5",
       "postcss-loader": "^5.2.0",
       "react": "^17.0.1",
       "react-dom": "^17.0.1",
       "react-router": "^5.2.0",
       "react-router-dom": "^5.2.0",
       "style-loader": "^2.0.0",
       "supervisor": "^0.12.0",
       "typescript": "^4.2.3",
       "webpack": "^5.26.3",
       "webpack-cli": "^4.5.0",
       "webpack-merge": "^5.7.3"
     },
     "devDependencies": {
       "webpack-dev-server": "^3.11.2"
     }
   }
   ```

2. 最终项目目录结构：

   ```js
   .
   ├── logs
   │   └── globallog.log
   ├── public
   │   └── template
   │       ├── favicon.ico
   │       └── index.html
   ├── src
   │   ├── server
   │   │   ├── app.js
   │   │   ├── config
   │   │   │   └── index.js
   │   │   ├── controller
   │   │   │   ├── BackendController.js
   │   │   │   └── IndexController.js
   │   │   ├── db
   │   │   │   └── mysqlHelper.js
   │   │   ├── exception
   │   │   │   └── ErrorHandler.js
   │   │   └── utils
   │   │       └── R.js
   │   └── web
   │       ├── apiUrl.js
   │       ├── components
   │       │   ├── Author.js
   │       │   └── IndexHeader.js
   │       ├── defaultUrl.js
   │       ├── index.js
   │       ├── layout
   │       │   ├── Admin.js
   │       │   └── Index.js
   │       ├── pages
   │       │   ├── ArticleAdd.js
   │       │   ├── ArticleList.js
   │       │   ├── Index.js
   │       │   ├── LeavingAMessage.js
   │       │   ├── List.js
   │       │   ├── Login.js
   │       │   ├── Menu.js
   │       │   └── detail.js
   │       ├── routes.js
   │       └── style
   │           ├── AddArticle.less
   │           ├── ArticleList.less
   │           ├── Detail.less
   │           ├── Header.less
   │           ├── Index.less
   │           ├── adminIndex.less
   │           └── login.less
   ├── webpack_config
   │   ├── webpack.base.js
   │   ├── webpack.development.js
   │   └── webpack.production.js
   ├── webpack.config.js
   ├── gulpfile.js
   ├── package.json
   ├── postcss.config.js
   ├── yarn-error.log
   └── yarn.lock
   ```

## TODO

- typescript增强
- 部署






