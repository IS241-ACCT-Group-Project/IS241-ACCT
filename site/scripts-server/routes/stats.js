module.exports = function (app) {
    app.get("/vaxbymonths", vaxByMonths);
    app.get("/totalsites", totalSites);
    app.get("/totalinjectors", totalInjectors);
    app.get("/totalpatients", totalPatients);
    app.get("/totalvax", totalVaccinations);
    app.get("/monthvax", currentMonthVaccinations);

    app.get("/siteexists", siteExists);
    app.get("/injectorexists", injectorExists);
    app.get("/patientexists", patientExists);
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

    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }

        // console.log(result);

        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result[0]));
        response.end();
    });
}

function totalInjectors(request, response) {
    const sql = `SELECT COUNT(*) AS count FROM INJECTOR;`;

    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }

        // console.log(result);

        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result[0]));
        response.end();
    });
}

function totalPatients(request, response) {
    const sql = `SELECT COUNT(*) AS count FROM PATIENT_INFO;`;

    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }

        // console.log(result);

        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result[0]));
        response.end();
    });
}

function totalVaccinations(request, response) {
    const sql = `SELECT COUNT(*) AS count FROM PATIENT_VACCINATION;`;

    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }

        // console.log(result);

        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result[0]));
        response.end();
    });
}

function currentMonthVaccinations(request, response) {
    var date = new Date;

    const sql = `SELECT COUNT(*) AS count FROM PATIENT_VACCINATION WHERE VaccinationDate > '${date.getFullYear()}-${date.getMonth() + 1}-1';`;

    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }

        // console.log(result);

        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result[0]));
        response.end();
    });
}

function siteExists(request, response) {
    validate(request, response, "admin", function (isValid) {
        if (isValid) {
            const siteID = db.pool.escape(request.body.siteID);
            console.log("Check site exists recieved request for: " + siteID);

            const sql = `SELECT 1 FROM SITE WHERE SiteID = ${siteID};`;

            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    // throw err;
                    return;
                }

                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(result));
                response.end();
            });
        }
    });
}

function injectorExists(request, response) {
    validate(request, response, "admin", function (isValid) {
        if (isValid) {
            const injectorID = db.pool.escape(request.body.injectorID);
            console.log("Check injector exists recieved request for: " + injectorID);

            const sql = `SELECT 1 FROM INJECTOR WHERE InjectorID = ${injectorID};`;

            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    // throw err;
                    return;
                }

                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(result));
                response.end();
            });
        }
    });
}

function patientExists(request, response) {
    validate(request, response, "admin", function (isValid) {
        if (isValid) {
            const patientID = db.pool.escape(request.body.patientID);
            console.log("Check patient exists recieved request for: " + patientID);

            const sql = `SELECT 1 FROM PATIENT WHERE PatientID = ${patientID};`;

            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    // throw err;
                    return;
                }

                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(result));
                response.end();
            });
        }
    });
}