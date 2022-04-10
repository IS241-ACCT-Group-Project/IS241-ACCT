"use strict"
const myArgs = process.argv.slice(2);

//console.log(myArgs[0] + myArgs[1]);

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: myArgs[0], //username from database/mysql_login.txt
    password: myArgs[1], //password from database/mysql_login.txt
    database: 'VaxTest2',
    port: 3306
});

module.exports = connection;