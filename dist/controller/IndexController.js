"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mysqlHelper = require("../db/mysqlHelper");

var _R = _interopRequireDefault(require("../utils/R"));

var router = new _koaRouter["default"]();
var R = new _R["default"]();
router.get('/default/getArticleList', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var sql, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sql = "SELECT article.id as id," + "article.title as title," + "article.introduce as introduce," + "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," + "article.view_count as view_count ," + "type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = 1";
            _context.next = 3;
            return (0, _mysqlHelper.queryDb)(sql);

          case 3:
            res = _context.sent;
            R.ok(ctx, res, "获取成功");

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()).get('/default/getArticleById/:id', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var id, sql, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = ctx.params.id;
            sql = 'SELECT article.id as id,' + 'article.title as title,' + 'article.introduce as introduce,' + 'article.article_content as article_content,' + "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," + 'article.view_count as view_count ,' + 'type.typeName as typeName ,' + 'type.id as typeId ' + 'FROM article LEFT JOIN type ON article.type_id = type.Id ' + 'WHERE article.id=' + id;
            _context2.next = 4;
            return (0, _mysqlHelper.queryDb)(sql);

          case 4:
            res = _context2.sent;
            R.ok(ctx, res, "获取成功");

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()).get('/default/getListById/:id', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var id, sql, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = ctx.params.id;
            sql = 'SELECT article.id as id,' + 'article.title as title,' + 'article.introduce as introduce,' + "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," + 'article.view_count as view_count ,' + 'type.typeName as typeName ' + 'FROM article LEFT JOIN type ON article.type_id = type.Id ' + 'WHERE type_id=' + id;
            _context3.next = 4;
            return (0, _mysqlHelper.queryDb)(sql);

          case 4:
            res = _context3.sent;
            R.ok(ctx, res, "获取成功");

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}()).get('/default/getTypeInfo', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var sql, res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sql = "SELECT * FROM type";
            _context4.next = 3;
            return (0, _mysqlHelper.queryDb)(sql);

          case 3:
            res = _context4.sent;
            R.ok(ctx, res, "获取成功");

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}()).get(["/", "/login", "/admin", "/admin/(.*)"], function (ctx) {
  var file = _fs["default"].readFileSync(_path["default"].resolve(__dirname, "../web/index.html"));

  console.log("--->", file);
  ctx.set('Content-Type', 'text/html; charset=utf-8');
  ctx.body = file;
});
var _default = {
  init: function init(app) {
    app.use(router.routes()).use(router.allowedMethods());
  }
};
exports["default"] = _default;