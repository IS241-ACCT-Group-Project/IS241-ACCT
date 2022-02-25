const myArgs = process.argv.slice(2);

//console.log(myArgs[0] + myArgs[1]);

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: myArgs[0], //username from database/mysql_login.txt
    password: myArgs[1], //password from database/mysql_login.txt
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

    app.get("/listInjectors", function (req, response) {
        var sql = "SELECT * FROM INJECTOR";

        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            }

            response.end(JSON.stringify(result));
        });
    });

    app.get("/listsites", function (request, response) {
        var sql = "SELECT * FROM SITE";
        
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            }

            response.end(JSON.stringify(result));
        });
    });

    app.get("/listpatientinfo", function (request, response) {
        var sql = "SELECT * FROM PATIENT_INFO";
        
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            }

            response.end(JSON.stringify(result));
        });
    });

    app.get("/listpatientvaccination", function (request, response) {
        var sql = "SELECT * FROM PATIENT_VACCINATION";
        
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            }

            response.end(JSON.stringify(result));
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
            //response.write('<html><body><h1>Hello, World!</h1></body></html>');
            response.statusCode = 204;
            response.end();
        });
    });

    app.post("/addsite", function (request, response) {
        //get values from form "name=" with request.body
        const name = connection.escape(request.body.name);
        const address = connection.escape(request.body.address);
        const zipCode = connection.escape(request.body.zipCode);
        const phone = connection.escape(request.body.phone);
        //compile sql statement
        var sql = `INSERT INTO SITE (SiteName, SiteAddress, SiteZipCode, SitePhoneNumber) VALUES (${name}, ${address}, ${zipCode}, ${phone});`;

        //debugging - prints to terminal
        console.log(request.body);
        console.log(sql);

        //attempt to execute sql
        connection.query(sql, function (err, result) {
            //print error if something went wrong
            if (err) {
                console.log(err);
                throw err;
            }

            response.statusCode = 204; //do not leave web page
            response.end();
        });
    });

    app.post("/addpatientinfo", function (request, response) {
        //get values from form "name=" with request.body
        const firstName = connection.escape(request.body.firstName);
        const lastName = connection.escape(request.body.lastName);
        const address = connection.escape(request.body.address);
        const zipCode = connection.escape(request.body.zipCode);
        //compile sql statement
        var sql = `INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES (${firstName}, ${lastName}, ${address}, ${zipCode});`;

        //debugging - prints to terminal
        console.log(request.body);
        console.log(sql);

        //attempt to execute sql
        connection.query(sql, function (err, result) {
            //print error if something went wrong
            if (err) {
                console.log(err);
                throw err;
            }

            response.statusCode = 204; //do not leave web page
            response.end();
        });
    });

    app.post("/addpatientvaccination", function (request, response) {
        //get values from form "name=" with request.body
        const patientID = connection.escape(request.body.patientID);
        const date = connection.escape(request.body.date);
        const injectorID = connection.escape(request.body.injectorID);
        const vaccinationType = connection.escape(request.body.vaccinationType);
        const lotNumber = connection.escape(request.body.lotNumber);
        //compile sql statement
        var sql = `INSERT INTO PATIENT_VACCINATION (PatientID, VaccinationDate, InjectorID, VaccinationType, LotNumber) VALUES (${patientID}, ${date}, ${injectorID}, ${vaccinationType}, ${lotNumber});`;

        //debugging - prints to terminal
        console.log(request.body);
        console.log(sql);

        //attempt to execute sql
        connection.query(sql, function (err, result) {
            //print error if something went wrong
            if (err) {
                console.log(err);
                throw err;
            }

            response.statusCode = 204; //do not leave web page
            response.end();
        });
    });

    var server = app.listen(8081, "localhost", function () {
        var host = server.address()
        console.log("Example app listening at http://%s", host)
    })
});