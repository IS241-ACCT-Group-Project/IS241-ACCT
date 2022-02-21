const myArgs = process.argv.slice(2);

//console.log(myArgs[0] + myArgs[1]);

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: myArgs[0], //'newuser',
    password: myArgs[1], //'newpassword',
    database: 'VaxTest2'
});


//from https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
var express = require('express');
var app = express();
//var fs = require("fs");
const cors = require("cors");
//const { body, validationResult } = require('express-validator');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

connection.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('Connected to MySQL Server!');

    app.get("/listInjectors", function (req, res) {
        //fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
        //    console.log(data);
        //    res.end(data);

        connection.query("SELECT * FROM INJECTOR", function (err, result) {
            if (err) {
                throw err;
            }
            res.end(JSON.stringify(result));
        });
    });

    app.post("/addinjector", function (request, response) {
        //body("firstName", "lastName").trim().isLength({ min: 1 }).escape();
        //body("siteID").trim().optional({ checkFalsy: true }).isNumeric().withMessage("Site ID must be a number.");
        //validationResult(req)=> {
        //}

        const firstname = connection.escape(request.body.firstName);
        const lastname = connection.escape(request.body.lastName);
        const siteid = connection.escape(request.body.siteID);
        var sql = `INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES (${firstname}, ${lastname}, ${siteid});`;

        console.log(request.body);
        console.log(sql);

        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }

            //response.append("Link", ["index.html"]);
            //response.end(JSON.stringify("Executed SQL " + sql));

            //response.setHeader("Content-Type", "text/html");
            //response.write('<html>');
            //response.write('<body>');
            //response.write('<h1>Hello, World!</h1>');
            //response.write('</body>');
            //response.write('</html>');
            response.statusCode = 204;
            response.end();
        });
    });

    var server = app.listen(8081, "localhost", function () {
        var host = server.address()
        //var port = server.address()
        console.log("Example app listening at http://%s", host)
    })
});