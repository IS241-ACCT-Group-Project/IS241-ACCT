module.exports = function (app) {
    app.post("/addinjector", addInjector);
    app.post("/editinjector", editInjector);
    app.post("/addsite", addSite);
    app.post("/editsite", editSite);
    app.post("/addpatientinfo", addPatientInfo);
    app.post("/editpatientinfo", editPatientInfo);
    app.post("/addpatientvaccination", addPatientVaccination);
}

const db = require("./../db");
const validate = require("../validate");
const audit = require("../audit");

function addInjector(request, response) {
    validate(request, response, "injector", function (accountID) {
        if (accountID) {
            //validation checks here

            //get values from form "name=" with request.body
            const firstname = db.pool.escape(request.body.firstName);
            const lastname = db.pool.escape(request.body.lastName);
            const siteid = db.pool.escape(request.body.siteID);
            //create sql statement
            const sql = `INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES (${firstname}, ${lastname}, ${siteid});`;

            //debugging - prints to terminal
            //console.log(request.body);
            console.log(sql);

            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    //throw err;
                    return;
                }

                audit(accountID, "add", sql);

                response.statusCode = 204; //do not leave web page
                response.end();
            });
        }
    });
}

function editInjector(request, response) {
    validate(request, response, "injector", function (accountID, associatedID) {
        if (accountID) {
            //validation checks here

            //get values from form "name=" with request.body
            const firstname = db.pool.escape(request.body.firstName);
            const lastname = db.pool.escape(request.body.lastName);
            const siteid = db.pool.escape(request.body.siteID);
            //create sql statement
            const sql = `UPDATE INJECTOR SET FirstName = ${firstname}, LastName = ${lastname}, SiteID = ${siteid} WHERE InjectorID = ${associatedID};`;

            //debugging - prints to terminal
            //console.log(request.body);
            console.log(sql);

            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    //throw err;
                    return;
                }

                audit(accountID, "edit", sql);

                response.statusCode = 204; //do not leave web page
                response.end();
            });
        }
    });
}

function addSite(request, response) {
    validate(request, response, "site", function (accountID) {
        if (accountID) {
            //validation checks here

            //get values from form "name=" with request.body
            const name = db.pool.escape(request.body.name);
            const address = db.pool.escape(request.body.address);
            const zipCode = db.pool.escape(request.body.zipCode);
            const phone = db.pool.escape(request.body.phone).replaceAll("-", "");
            //create sql statement
            const sql = `INSERT INTO SITE (SiteName, SiteAddress, SiteZipCode, SitePhoneNumber) VALUES (${name}, ${address}, ${zipCode}, ${phone});`;

            //debugging - prints to terminal
            //console.log(request.body);
            console.log(sql);

            //attempt to execute sql
            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    //throw err;
                    return;
                }

                audit(accountID, "add", sql);

                response.statusCode = 204; //do not leave web page
                response.end();
            });
        }
    });
}

function editSite(request, response) {
    validate(request, response, "site", function (accountID, associatedID) {
        if (accountID) {
            //validation checks here

            //get values from form "name=" with request.body
            const name = db.pool.escape(request.body.name);
            const address = db.pool.escape(request.body.address);
            const zipCode = db.pool.escape(request.body.zipCode);
            const phone = db.pool.escape(request.body.phone).replaceAll("-", "");
            //create sql statement
            const sql = `UPDATE SITE SET SiteName = ${name}, SiteAddress = ${address}, SiteZipCode = ${zipCode}, SitePhoneNumber = ${phone} WHERE SiteID = '${associatedID}';`;

            //debugging - prints to terminal
            //console.log(request.body);
            console.log(sql);

            //attempt to execute sql
            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    //throw err;
                    return;
                }

                audit(accountID, "edit", sql);

                response.statusCode = 204; //do not leave web page
                response.end();
            });
        }
    });
}

function addPatientInfo(request, response) {
    validate(request, response, "injector", function (accountID) {
        if (accountID) {
            //validation checks here

            //get values from form "name=" with request.body
            const firstName = db.pool.escape(request.body.firstName);
            const lastName = db.pool.escape(request.body.lastName);
            const birthdate = db.pool.escape(request.body.birthdate);
            const address = db.pool.escape(request.body.address);
            const zipCode = db.pool.escape(request.body.zipCode);
            //create sql statement
            const sql = `INSERT INTO PATIENT_INFO (FirstName, LastName, PatientDOB, PatientAddress, ZipCode) VALUES (${firstName}, ${lastName}, ${birthdate}, ${address}, ${zipCode});`;

            //debugging - prints to terminal
            //console.log(request.body);
            console.log(sql);

            //attempt to execute sql
            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    //throw err;
                    return;
                }

                audit(accountID, "add", sql);

                response.statusCode = 204; //do not leave web page
                response.end();
            });
        }
    });
}

function editPatientInfo(request, response) {
    console.log("No function to edit patient information.");
}

function addPatientVaccination(request, response) {
    validate(request, response, "injector", function (accountID) {
        if (accountID) {
            //validation checks here
        
            //get values from form "name=" with request.body
            const patientID = db.pool.escape(request.body.patientID);
            const date = db.pool.escape(request.body.date);
            const injectorID = db.pool.escape(request.body.injectorID);
            const type = db.pool.escape(request.body.type);
            const lotNumber = db.pool.escape(request.body.lotNumber);
            //create sql statement
            const sql = `INSERT INTO PATIENT_VACCINATION (PatientID, VaccinationDate, InjectorID, VaccinationType, LotNumber) VALUES (${patientID}, ${date}, ${injectorID}, ${type}, ${lotNumber});`;
        
            //debugging - prints to terminal
            //console.log(request.body);
            console.log(sql);
        
            //attempt to execute sql
            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    //throw err;
                    return;
                }

                audit(accountID, "add", sql);

                response.statusCode = 204; //do not leave web page
                response.end();
            });
        }
    });
}