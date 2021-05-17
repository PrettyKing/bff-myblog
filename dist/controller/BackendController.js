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
router.post('/api/checkLogin', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var userName, password, sql, res, openId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userName = ctx.request.body.userName;
            password = ctx.request.body.password;
            console.log(ctx.request.body);

            if (!userName || !password) {
              ctx.body = {
                code: -1,
                msg: "参数不正确"
              };
            }

            sql = " SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "'";
            console.log(sql);
            _context.next = 8;
            return (0, _mysqlHelper.queryDb)(sql);

          case 8:
            res = _context.sent;

            //登录成功,进行session缓存
            if (res.length > 0) {
              openId = new Date().getTime();
              ctx.session.openId = {
                openId: openId
              };
              R.ok(ctx, {
                openId: openId
              }, "登录成功");
            } else {
              R.notOk(ctx, "登录失败");
            }

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()).get("/api/getTypeInfo", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var sql, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sql = "SELECT * FROM type";
            _context2.next = 3;
            return (0, _mysqlHelper.queryDb)(sql);

          case 3:
            res = _context2.sent;
            R.ok(ctx, {
              data: res
            }, "获取成功");

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()).post("/api/addArticle", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var _ctx$request$body, type_id, title, article_content, introduce, addTime, view_count, sql, result, msg, insertId;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ctx$request$body = ctx.request.body, type_id = _ctx$request$body.type_id, title = _ctx$request$body.title, article_content = _ctx$request$body.article_content, introduce = _ctx$request$body.introduce, addTime = _ctx$request$body.addTime, view_count = _ctx$request$body.view_count;
            sql = "INSERT INTO article (type_id,title,article_content,introduce,addTime,view_count) VALUE (".concat(type_id, ",\"").concat(title, "\",\"").concat(article_content, "\",\"").concat(introduce, "\",").concat(addTime, ",").concat(view_count, ")");
            console.log(sql);
            _context3.next = 5;
            return (0, _mysqlHelper.queryDb)(sql);

          case 5:
            result = _context3.sent;
            msg = result.affectedRows === 1;
            insertId = result.insertId;
            R.ok(ctx, {
              msg: msg,
              insertId: insertId
            });

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}()).post("/api/updateArticle", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var _ctx$request$body2, id, type_id, title, article_content, introduce, addTime, view_count, sql, result, updateSuccess;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _ctx$request$body2 = ctx.request.body, id = _ctx$request$body2.id, type_id = _ctx$request$body2.type_id, title = _ctx$request$body2.title, article_content = _ctx$request$body2.article_content, introduce = _ctx$request$body2.introduce, addTime = _ctx$request$body2.addTime, view_count = _ctx$request$body2.view_count;
            sql = "UPDATE article SET type_id=".concat(type_id, ",title=\"").concat(title, "\",article_content=\"").concat(article_content, "\",introduce=\"").concat(introduce, "\",addTime=").concat(addTime, ",view_count=").concat(view_count, " WHERE id=").concat(id);
            console.log(sql);
            _context4.next = 5;
            return (0, _mysqlHelper.queryDb)(sql);

          case 5:
            result = _context4.sent;
            updateSuccess = result.affectedRows === 1;
            R.ok(ctx, {
              updateSuccess: updateSuccess
            });

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}()).get("/api/getArticleList", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ctx) {
    var sql, res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            sql = "SELECT article.id as id," + "article.title as title," + "article.introduce as introduce," + "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," + "type.typeName as typeName " + "FROM article LEFT JOIN type ON article.type_id = type.Id " + "ORDER BY article.id DESC ";
            _context5.next = 3;
            return (0, _mysqlHelper.queryDb)(sql);

          case 3:
            res = _context5.sent;
            R.ok(ctx, {
              list: res
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}()).get("/api/delArticle/:id", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(ctx) {
    var id, sql, res;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = ctx.params.id;
            sql = "DELETE FROM article WHERE id=".concat(id, ";");
            console.log(sql);
            _context6.next = 5;
            return (0, _mysqlHelper.queryDb)(sql);

          case 5:
            res = _context6.sent;
            R.ok(ctx, {
              isSucess: res
            });

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}()).get("/api/getArticleById/:id", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(ctx) {
    var id, sql, res;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = ctx.params.id;
            sql = "SELECT article.id as id," + "article.title as title," + "article.introduce as introduce," + "article.article_content as article_content," + "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," + "article.view_count as view_count ," + "type.typeName as typeName ," + "type.id as typeId " + "FROM article LEFT JOIN type ON article.type_id = type.Id " + "WHERE article.id=" + id;
            _context7.next = 4;
            return (0, _mysqlHelper.queryDb)(sql);

          case 4:
            res = _context7.sent;
            R.ok(ctx, {
              data: res
            });

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x7) {
    return _ref7.apply(this, arguments);
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