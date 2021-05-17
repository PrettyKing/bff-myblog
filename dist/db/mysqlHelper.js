"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mysql = _interopRequireDefault(require("mysql"));

var dbOption = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'react_blog'
};
module.exports = {
  testConnection: function testConnection() {
    var connection = _mysql["default"].createConnection(dbOption);

    connection.connect();
    console.log("\u6253\u5F00\u6570\u636E\u5E93\u6210\u529F");
  },
  queryDb: function queryDb(sql) {
    var connection = _mysql["default"].createConnection(dbOption);

    return new Promise(function (resolve) {
      connection.query(sql, function (error, res) {
        if (error) {
          console.log(err);
          resolve({
            errno: err.errno,
            code: err.code,
            sqlMessage: err.sqlMessage
          });
        } else {
          resolve(res);
        }

        connection.end();
      });
    });
  }
};