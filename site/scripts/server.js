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

app.use(express.static("../site"));

connection.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('Connected to MySQL Server!');

    //access website by going to http://localhost:8081
    app.get("/", function (request, response) {
        response.setHeader("Cache-Control", "no-cache"); //remove "no-cache" when website is live

        //DON'T CHANGE THIS HERE - REDIRECT TO A DIFFERENT PAGE IN INDEX.HTML
        response.sendFile("../site/index.html"); //start user on index page
        //response.redirect("../site/login.html");
    });

    //#region List DB
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

    //#endregion

    //#region Add to DB
    app.post("/addinjector", function (request, response) {
        //body("firstName", "lastName").trim().isLength({ min: 1 }).escape();
        //body("siteID").trim().optional({ checkFalsy: true }).isNumeric().withMessage("Site ID must be a number.");
        //validationResult(req)=> {
        //}

        const firstname = connection.escape(request.body.firstName);
        const lastname = connection.escape(request.body.lastName);
        const siteid = connection.escape(request.body.siteID);
        //can var sql be const sql?
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
    //#endregion

    //#region Search DB
    app.post("/searchsites", function (request, response) {
        //make these arrays for easy iteration
        const fieldNames = [
            "SiteID",
            "SiteName",
            "SiteAddress",
            "SiteZipCode",
            "SitePhoneNumber"
        ];
        //get values from form "name=" with request.body
        const fieldData = [
            connection.escape("%" + request.body.siteID + "%"),
            connection.escape("%" + request.body.name + "%"),
            connection.escape("%" + request.body.address + "%"),
            connection.escape("%" + request.body.zipCode + "%"),
            connection.escape("%" + request.body.phone + "%")
        ];

        const sql = buildSearchSQL("SITE", fieldNames, fieldData);

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

            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            response.end();
        });
    });



    app.post("/searchinjectors", function (request, response) {
        //make these arrays for easy iteration
        const fieldNames = [
            "InjectorID",
            "FirstName",
            "LastName",
            "SiteID"
        ];
        //get values from form "name=" with request.body
        const fieldData = [
            connection.escape("%" + request.body.injectorID + "%"),
            connection.escape("%" + request.body.firstName + "%"),
            connection.escape("%" + request.body.lastName + "%"),
            connection.escape("%" + request.body.clinicID + "%"),
        ];

        const sql = buildSearchSQL("INJECTOR", fieldNames, fieldData);

        //debugging - prints to terminal
        console.log(request.body);
        console.log(sql);

        var resultsHTML = ""; //HTML to be displayed on web pgae

        //attempt to execute sql
        connection.query(sql, function (err, result) {
            //print error if something went wrong
            if (err) {
                console.log(err);
                throw err;
            }

            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            response.end();
        });
    });

    function buildSearchSQL(db, names, data) {
        var sql = `SELECT * FROM ${db} WHERE(`;
        var addAND = false; //for adding multiple search criteria

        const arrLength = data.length;
        for (var i = 0; i < arrLength; ++i) {
            if (data[i].length > 4) {
                if (addAND) { //add AND because this is not the first criteria
                    sql += " AND ";
                } else { //will add ANDs to every criteria after this
                    addAND = true;
                }

                sql += `${names[i]} LIKE ${data[i]}`;
            }
        }
        sql += ");";

        if (!addAND) { //if no criteria were added, show all sites instead
            sql = `SELECT * FROM ${db};`;
        }

        return sql;
    }
    //#endregion

    var server = app.listen(8081, "localhost", function () {
        var host = server.address()
        console.log("Example app listening at http://%s", host)
    })
});