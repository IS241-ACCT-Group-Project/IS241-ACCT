module.exports = function (app) {
    app.post("/searchsites", searchSites);
    app.post("/searchinjectors", searchInjector);
    app.post("/searchpatientinfo", searchPatientInfo);
    app.post("/searchpatientvaccination", searchPatientVaccination);
}

const validate = require("../validate");
const db = require("./../db");

function searchSites(request, response) {
    validate(request, response, "cdc", function (accountID) {
        if (accountID) {
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
                db.pool.escape("%" + request.body.siteID + "%"),
                db.pool.escape("%" + request.body.name + "%"),
                db.pool.escape("%" + request.body.address + "%"),
                db.pool.escape("%" + request.body.zipCode + "%"),
                db.pool.escape("%" + request.body.phone + "%")
            ];

            const sql = buildSearchSQL("SITE", fieldNames, fieldData);

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

                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(result));
                response.end();
            });
        }
    });
}

function searchInjector(request, response) {
    validate(request, response, "cdc", function (accountID) {
        if (accountID) {
            //make these arrays for easy iteration
            const fieldNames = [
                "InjectorID",
                "FirstName",
                "LastName",
                "SiteID"
            ];
            //get values from form "name=" with request.body
            const fieldData = [
                db.pool.escape("%" + request.body.injectorID + "%"),
                db.pool.escape("%" + request.body.firstName + "%"),
                db.pool.escape("%" + request.body.lastName + "%"),
                db.pool.escape("%" + request.body.siteID + "%"),
            ];

            const sql = buildSearchSQL("INJECTOR", fieldNames, fieldData);

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

                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(result));
                response.end();
            });
        }
    });
}

function searchPatientInfo(request, response) {
    validate(request, response, "admin", function (accountID) {
        if (accountID) {
            //make these arrays for easy iteration
            const fieldNames = [
                "PatientID",
                "FirstName",
                "LastName",
                "PatientDOB",
                "Address",
                "ZipCode"
            ];
            //get values from form "name=" with request.body
            const fieldData = [
                db.pool.escape("%" + request.body.patientID + "%"),
                db.pool.escape("%" + request.body.firstName + "%"),
                db.pool.escape("%" + request.body.lastName + "%"),
                db.pool.escape("%" + request.body.birthdate + "%"),
                db.pool.escape("%" + request.body.address + "%"),
                db.pool.escape("%" + request.body.zipCode + "%"),
            ];

            const sql = buildSearchSQL("PATIENT_INFO", fieldNames, fieldData);

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

                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(result));
                response.end();
            });
        }
    });
}

function searchPatientVaccination(request, response) {
    validate(request, response, "cdc", function (accountID) {
        if (accountID) {
            //make these arrays for easy iteration
            const fieldNames = [
                "PatientID",
                "VaccinationDate",
                "InjectorID",
                "INJECTOR.FirstName",
                "INJECTOR.LastName",
                "VaccinationType",
                "LotNumber"
            ];
            //get values from form "name=" with request.body
            const fieldData = [
                db.pool.escape(request.body.patientID),
                db.pool.escape(request.body.date),
                db.pool.escape(request.body.injectorID),
                db.pool.escape("%" + request.body.firstName + "%"),
                db.pool.escape("%" + request.body.lastName + "%"),
                db.pool.escape("%" + request.body.type + "%"),
                db.pool.escape("%" + request.body.lotNumber + "%"),
            ];

            const sql = buildSearchSQL("PATIENT_VACCINATION", fieldNames, fieldData);

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

                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(result));
                response.end();
            });
        }
    });
}

function buildSearchSQL(db, names, data) {
    const columnNames = `INJECTOR.FirstName, INJECTOR.LastName, PATIENT_VACCINATION.*`;
    var sql = `SELECT * FROM ${db} WHERE(`;

    if (db == "PATIENT_VACCINATION") {
        sql = `SELECT ${columnNames} FROM ${db} INNER JOIN INJECTOR ON INJECTOR.InjectorID = PATIENT_VACCINATION.InjectorID WHERE(`;
    }
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

        if (db == "PATIENT_VACCINATION") {
            sql = `SELECT ${columnNames} FROM ${db} INNER JOIN INJECTOR ON INJECTOR.InjectorID = PATIENT_VACCINATION.InjectorID;`;
        }
    }

    return sql;
}