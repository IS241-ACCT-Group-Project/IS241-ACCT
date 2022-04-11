module.exports = function (app) {
    app.get("/listInjectors", listInjectors);
    app.get("/listsites", listSites);
    app.get("/listpatientinfo", listPatientInfo);
    app.get("/listpatientvaccination", listPatientVaccination);
}

const db = require("./../db");

function listInjectors(req, response) {
    var sql = "SELECT * FROM INJECTOR";

    db.query(sql, function (err, result) {
        if (err) {
            //throw err;
            return;
        }

        response.end(JSON.stringify(result));
    });
}

function listSites(request, response) {
    var sql = "SELECT * FROM SITE";

    db.query(sql, function (err, result) {
        if (err) {
            //throw err;
            return;
        }

        response.end(JSON.stringify(result));
    });
}

function listPatientInfo(request, response) {
    var sql = "SELECT * FROM PATIENT_INFO";

    db.query(sql, function (err, result) {
        if (err) {
            //throw err;
            return;
        }

        response.end(JSON.stringify(result));
    });
}

function listPatientVaccination(request, response) {
    var sql = "SELECT * FROM PATIENT_VACCINATION";

    db.query(sql, function (err, result) {
        if (err) {
            //throw err;
            return;
        }

        response.end(JSON.stringify(result));
    });
}