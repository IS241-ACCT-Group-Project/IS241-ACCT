"use strict";

const myArgs = process.argv.slice(2);

//console.log(myArgs[0] + myArgs[1]);

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: myArgs[0], //username from database/mysql_login.txt
//     password: myArgs[1], //password from database/mysql_login.txt
//     database: 'VaxTest2',
//     port: 3306
// });
const db = require("./db");


//from https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
var express = require('express');
var app = express();
var fs = require("fs");
const cors = require("cors");
//const { body, validationResult } = require('express-validator');
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.use(express.static("../site"));

//db.connect((err) => {
//   if (err) {
//       console.log(err);
//       //throw err;
//   }

console.log('Connected to MySQL Server!');

//separate files added here
var accounts = require("./routes/accounts");
accounts(app);

var modifyDB = require("./routes/modify-db");
modifyDB(app);

//access local website by going to http://localhost:8081
app.get("/", function (request, response) {
    response.setHeader("Cache-Control", "no-cache"); //remove "no-cache" when website is live

    //DON'T CHANGE THIS HERE - REDIRECT TO A DIFFERENT PAGE IN INDEX.HTML
    response.sendFile("../site/index.html"); //start user on index page
    //response.redirect("../site/login.html");
});

//#region List DB
app.get("/listInjectors", function (req, response) {
    var sql = "SELECT * FROM INJECTOR";

    db.query(sql, function (err, result) {
        if (err) {
            //throw err;
            return;
        }

        response.end(JSON.stringify(result));
    });
});

app.get("/listsites", function (request, response) {
    var sql = "SELECT * FROM SITE";

    db.query(sql, function (err, result) {
        if (err) {
            //throw err;
            return;
        }

        response.end(JSON.stringify(result));
    });
});

app.get("/listpatientinfo", function (request, response) {
    var sql = "SELECT * FROM PATIENT_INFO";

    db.query(sql, function (err, result) {
        if (err) {
            //throw err;
            return;
        }

        response.end(JSON.stringify(result));
    });
});

app.get("/listpatientvaccination", function (request, response) {
    var sql = "SELECT * FROM PATIENT_VACCINATION";

    db.query(sql, function (err, result) {
        if (err) {
            //throw err;
            return;
        }

        response.end(JSON.stringify(result));
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
        db.escape("%" + request.body.siteID + "%"),
        db.escape("%" + request.body.name + "%"),
        db.escape("%" + request.body.address + "%"),
        db.escape("%" + request.body.zipCode + "%"),
        db.escape("%" + request.body.phone + "%")
    ];

    const sql = buildSearchSQL("SITE", fieldNames, fieldData);

    //debugging - prints to terminal
    console.log(request.body);
    console.log(sql);

    //attempt to execute sql
    db.query(sql, function (err, result) {
        //print error if something went wrong
        if (err) {
            console.log(err);
            //// throw err;
            return;
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
        db.escape("%" + request.body.injectorID + "%"),
        db.escape("%" + request.body.firstName + "%"),
        db.escape("%" + request.body.lastName + "%"),
        db.escape("%" + request.body.siteID + "%"),
    ];

    const sql = buildSearchSQL("INJECTOR", fieldNames, fieldData);

    //debugging - prints to terminal
    console.log(request.body);
    console.log(sql);

    //attempt to execute sql
    db.query(sql, function (err, result) {
        //print error if something went wrong
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result));
        response.end();
    });
});

app.post("/searchpatientinfo", function (request, response) {
    //make these arrays for easy iteration
    const fieldNames = [
        "PatientID",
        "FirstName",
        "LastName",
        "Address",
        "ZipCode"
    ];
    //get values from form "name=" with request.body
    const fieldData = [
        db.escape("%" + request.body.patientID + "%"),
        db.escape("%" + request.body.firstName + "%"),
        db.escape("%" + request.body.lastName + "%"),
        db.escape("%" + request.body.address + "%"),
        db.escape("%" + request.body.zipCode + "%"),
    ];

    const sql = buildSearchSQL("PATIENT_INFO", fieldNames, fieldData);

    //debugging - prints to terminal
    console.log(request.body);
    console.log(sql);

    //attempt to execute sql
    db.query(sql, function (err, result) {
        //print error if something went wrong
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result));
        response.end();
    });
});

app.post("/searchpatientvaccination", function (request, response) {
    //make these arrays for easy iteration
    const fieldNames = [
        "PatientID",
        "VaccinationDate",
        "InjectorID",
        "VaccinationType",
        "LotNumber"
    ];
    //get values from form "name=" with request.body
    const fieldData = [
        db.escape("%" + request.body.patientID + "%"),
        db.escape("%" + request.body.date + "%"),
        db.escape("%" + request.body.injectorID + "%"),
        db.escape("%" + request.body.type + "%"),
        db.escape("%" + request.body.lotNumber + "%"),
    ];

    const sql = buildSearchSQL("PATIENT_VACCINATION", fieldNames, fieldData);

    //debugging - prints to terminal
    console.log(request.body);
    console.log(sql);

    //attempt to execute sql
    db.query(sql, function (err, result) {
        //print error if something went wrong
        if (err) {
            console.log(err);
            //throw err;
            return;
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

// httpServer.listen(8080);
// //, function () {
// //    var host = httpServer.address()
// //    console.log("Example app listening on port " + host.port)
// //    // console.log(JSON.stringify(host))
// //})

// if (httpsCreated) {
//     httpsServer.listen(8081);
//     // , function () {
//     //    var host = httpsServer.address()
//     //    console.log("Example app listening on port " + host.port)
//     //    // console.log(JSON.stringify(host))
//     // })
// }
//});

module.exports = app;
//});