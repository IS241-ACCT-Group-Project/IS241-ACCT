module.exports = function (app) {
    app.post("/addinjector", addInjector);
    app.post("/addsite", addSite);
    app.post("/addpatientinfo", addPatientInfo);
    app.post("/addpatientvaccination", addPatientVaccination);
}

const db = require("./../db");

function addInjector(request, response) {
    //validation checks here

    //get values from form "name=" with request.body
    const firstname = db.escape(request.body.firstName);
    const lastname = db.escape(request.body.lastName);
    const siteid = db.escape(request.body.siteID);
    //create sql statement
    const sql = `INSERT INTO INJECTOR (FirstName, LastName, SiteID) VALUES (${firstname}, ${lastname}, ${siteid});`;

    //debugging - prints to terminal
    //console.log(request.body);
    console.log(sql);

    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        response.statusCode = 204; //do not leave web page
        response.end();
    });
}

function addSite(request, response) {
    //validation checks here

    //get values from form "name=" with request.body
    const name = db.escape(request.body.name);
    const address = db.escape(request.body.address);
    const zipCode = db.escape(request.body.zipCode);
    const phone = db.escape(request.body.phone);
    //create sql statement
    const sql = `INSERT INTO SITE (SiteName, SiteAddress, SiteZipCode, SitePhoneNumber) VALUES (${name}, ${address}, ${zipCode}, ${phone});`;

    //debugging - prints to terminal
    //console.log(request.body);
    console.log(sql);

    //attempt to execute sql
    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        response.statusCode = 204; //do not leave web page
        response.end();
    });
}

function addPatientInfo(request, response) {
    //validation checks here

    //get values from form "name=" with request.body
    const firstName = db.escape(request.body.firstName);
    const lastName = db.escape(request.body.lastName);
    const address = db.escape(request.body.address);
    const zipCode = db.escape(request.body.zipCode);
    //create sql statement
    const sql = `INSERT INTO PATIENT_INFO (FirstName, LastName, PatientAddress, ZipCode) VALUES (${firstName}, ${lastName}, ${address}, ${zipCode});`;

    //debugging - prints to terminal
    //console.log(request.body);
    console.log(sql);

    //attempt to execute sql
    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        response.statusCode = 204; //do not leave web page
        response.end();
    });
}

function addPatientVaccination(request, response) {
    //validation checks here

    //get values from form "name=" with request.body
    const patientID = db.escape(request.body.patientID);
    const date = db.escape(request.body.date);
    const injectorID = db.escape(request.body.injectorID);
    const type = db.escape(request.body.type);
    const lotNumber = db.escape(request.body.lotNumber);
    //create sql statement
    const sql = `INSERT INTO PATIENT_VACCINATION (PatientID, VaccinationDate, InjectorID, VaccinationType, LotNumber) VALUES (${patientID}, ${date}, ${injectorID}, ${type}, ${lotNumber});`;

    //debugging - prints to terminal
    //console.log(request.body);
    console.log(sql);

    //attempt to execute sql
    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        response.statusCode = 204; //do not leave web page
        response.end();
    });
}