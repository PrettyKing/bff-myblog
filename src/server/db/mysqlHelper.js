import mysql from 'mysql'

const dbOption = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react_blog',
};

module.exports = {
    testConnection: function () {
        var connection = mysql.createConnection(dbOption)
        connection.connect()
        console.log(`打开数据库成功`);
    },
    queryDb: function (sql) {
        var connection = mysql.createConnection(dbOption)
        return new Promise((resolve) => {
            connection.query(sql, function (error, res) {
                if (error) {
                    console.log(err)
                    resolve({
                        errno: err.errno,
                        code: err.code,
                        sqlMessage: err.sqlMessage
                    })
                } else {
                    resolve(res)
                }
                connection.end()
            })
        })
    }
}