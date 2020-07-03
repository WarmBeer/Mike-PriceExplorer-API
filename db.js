const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : process.env.DB_HOST || 'localhost',
    user     : process.env.DB_USER || 'user',
    password : process.env.DB_PASSWORD || 'password',
    database : process.env.DB_DATABASE || 'grinnode'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
