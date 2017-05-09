// var mysql = require('mysql');
//
// function Connection() {
//   this.pool = null;
//
//   this.init = function() {
//     this.pool = mysql.createPool({
//       connectionLimit: 10,
//       host: 'localhost',
//       user: 'root',
//         password : 'Ps123$%^',
//         port: 3306,
//         charset : 'utf8mb4',
//       database: 'instadb'
//     });
//   };
//
//   this.acquire = function(callback) {
//     this.pool.getConnection(function(err, connection) {
//       callback(err, connection);
//     });
//   };
// }

// module.exports = new Connection();
module.exports = {
    url : 'mongodb://10.8.1.217:27017/Learn'
};