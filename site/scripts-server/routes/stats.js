module.exports = function (app) {
    app.get("/vaxbymonths", vaxByMonths);
    app.get("/totalsites", totalSites);
    app.get("/totalinjectors", totalInjectors);
    app.get("/totalpatients", totalPatients);
    app.get("/totalvax", totalVaccinations);
    app.get("/monthvax", currentMonthVaccinations);

    app.post("/siteexists", siteExists);
    app.post("/injectorexists", injectorExists);
    app.post("/patientexists", patientExists);
}

const db = require("./../db");
const validate = require("../validate");

function vaxByMonths(request, response) {
    validate(request, response, "admin", function (isValid) {
        if (isValid) {

            var date = new Date;
            date.setMonth(date.getMonth() - 12);

            const sql = `SELECT VaccinationDate, COUNT(*) AS count FROM PATIENT_VACCINATION WHERE VaccinationDate > '${date.getFullYear()}-${date.getMonth() + 1}-1' GROUP BY YEAR(VaccinationDate), MONTH(VaccinationDate) ORDER BY VaccinationDate DESC;`;
            console.log(sql);

            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    // throw err;
                    return;
                }

                // console.log(result[0]);
                // console.log(result[1]);

                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(result));
                response.end();
            });
        }
    });
}

function totalSites(request, response) {
    const sql = `SELECT COUNT(*) AS count FROM SITE;`;

    queryOne(sql, response);
}

function totalInjectors(request, response) {
    const sql = `SELECT COUNT(*) AS count FROM INJECTOR;`;

    queryOne(sql, response);
}

function totalPatients(request, response) {
    const sql = `SELECT COUNT(*) AS count FROM PATIENT_INFO;`;

    queryOne(sql, response);
}

function totalVaccinations(request, response) {
    const sql = `SELECT COUNT(*) AS count FROM PATIENT_VACCINATION;`;

    queryOne(sql, response);
}

function currentMonthVaccinations(request, response) {
    var date = new Date;

    const sql = `SELECT COUNT(*) AS count FROM PATIENT_VACCINATION WHERE VaccinationDate > '${date.getFullYear()}-${date.getMonth() + 1}-1';`;

    queryOne(sql, response);
}

function siteExists(request, response) {
    validate(request, response, null, function (isValid) {
        if (isValid) {
            const siteID = db.pool.escape(request.body);
            console.log("Check site exists recieved request for: " + siteID);

            const sql = `SELECT * FROM SITE WHERE SiteID = ${siteID};`;

            queryOne(sql, response);
        }
    });
}

function injectorExists(request, response) {
    validate(request, response, null, function (isValid) {
        if (isValid) {
            const injectorID = db.pool.escape(request.body);
            console.log("Check injector exists recieved request for: " + injectorID);

            const sql = `SELECT * FROM INJECTOR WHERE InjectorID = ${injectorID};`;

            queryOne(sql, response);
        }
    });
}

function patientExists(request, response) {
    validate(request, response, null, function (isValid) {
        if (isValid) {
            const patientID = db.pool.escape(request.body);
            console.log("Check patient exists recieved request for: " + patientID);

            const sql = `SELECT * FROM PATIENT_INFO WHERE PatientID = ${patientID};`;

            queryOne(sql, response);
        }
    });
}

function queryOne(sql, response) {
    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }

        // console.log(result);

        response.setHeader("Content-Type", "application/json");
        if (result[0]) {
            response.write(JSON.stringify(result[0]));
        }
        else {
            response.write(JSON.stringify(""));
        }
        response.end();
    });
}