"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var constant = {
  SUCESS_CODE: 200,
  ERROR_CODE: -1
};

var R = /*#__PURE__*/function () {
  function R() {
    (0, _classCallCheck2["default"])(this, R);
    this.code = null;
    this.msg = null;
    this.data = null;
  }

  (0, _createClass2["default"])(R, [{
    key: "ok",
    value: function ok(ctx) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.data;
      var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.msg;
      var code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : constant.SUCESS_CODE;
      return ctx.body = {
        code: code,
        msg: msg,
        data: data
      };
    }
  }, {
    key: "notOk",
    value: function notOk(ctx, msg) {
      var code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : constant.ERROR_CODE;
      return ctx.body = {
        code: code,
        msg: msg
      };
    }
  }]);
  return R;
}();

module.exports = R;