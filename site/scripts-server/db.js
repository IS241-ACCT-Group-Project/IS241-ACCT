"use strict"

const myArgs = process.argv.slice(2);
//console.log(myArgs[0] + myArgs[1]);

const mysql = require('mysql');
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);

const options = {
    host: '127.0.0.1',
    user: myArgs[0], //username from database/mysql_login.txt
    password: myArgs[1], //password from database/mysql_login.txt
    database: 'VaxTest2',
    port: 3306,
    connectionLimit: 10,
    createDatabaseTable: false, 
    multipleStatements: true
}

const pool = mysql.createPool(options);

const sessionStore = new mysqlStore(options);

//const connection = mysql.createConnection({
//    host: '127.0.0.1',
//    user: myArgs[0], //username from database/mysql_login.txt
//    password: myArgs[1], //password from database/mysql_login.txt
//    database: 'VaxTest2',
//    port: 3306
//});

//connection.connect((err) => {
//    if (err) {
//        console.log(err);
//        //throw err;
//    }
//    else {
//        console.log('Connected to MySQL Server!\n');
//    }
//});

if (!pool) {
    console.log("MYSQL CONNECTION FAILED.");
    //throw err;
}
else {
    console.log('Connected to MySQL Server!\n');
}

const dbConnection = { pool: pool, sessionStore: sessionStore };

module.exports = dbConnection;