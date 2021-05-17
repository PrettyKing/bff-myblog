"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _log4js = _interopRequireDefault(require("log4js"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _index = _interopRequireDefault(require("./config/index"));

var _path = _interopRequireDefault(require("path"));

var _IndexController = _interopRequireDefault(require("./controller/IndexController"));

var _BackendController = _interopRequireDefault(require("./controller/BackendController"));

var _ErrorHandler = _interopRequireDefault(require("./exception/ErrorHandler"));

var _mysqlHelper = require("./db/mysqlHelper");

var _koaSession = _interopRequireDefault(require("koa-session"));

var app = new _koa["default"]();
app.keys = ['bffsecret'];
var CONFIG = {
  key: 'bffsecret',
  //cookie key (default is koa:sess)
  maxAge: 86400000,
  // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true,
  //是否可以overwrite    (默认default true)
  httpOnly: true,
  //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true,
  //签名默认true
  rolling: false,
  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false //(boolean) renew session when session is nearly expired,

};
app.use((0, _koaSession["default"])(CONFIG, app));
app.use((0, _koaBody["default"])()); // 错误日志记录

_log4js["default"].configure({
  appenders: {
    globallog: {
      type: 'file',
      filename: './logs/globallog.log'
    }
  },
  categories: {
    "default": {
      appenders: ['globallog'],
      level: 'debug'
    }
  }
});

var logger = _log4js["default"].getLogger('globallog');

_ErrorHandler["default"].init(app, logger);

(0, _mysqlHelper.testConnection)(); // 初始化路由

_BackendController["default"].init(app);

_IndexController["default"].init(app); // 静态资源目录


app.use((0, _koaStatic["default"])(_path["default"].resolve(__dirname, "./web")));
module.exports = app.listen(_index["default"].port, function () {
  console.log("server is running at : http://localhost:".concat(_index["default"].port));
});