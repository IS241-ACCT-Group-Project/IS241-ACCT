module.exports = function (app) {
    app.get("/vaxbymonths", vaxByMonths);
}

const db = require("./../db");

function vaxByMonths(request, response) {
    var date = new Date;
    var startAt = date.setMonth(date.getMonth() - 11);

    const sql = `SELECT VaccinationDate, COUNT(*) AS count FROM PATIENT_VACCINATION WHERE VaccinationDate > '${date.getFullYear()}-${date.getMonth()}-1' GROUP BY YEAR(VaccinationDate), MONTH(VaccinationDate) ORDER BY VaccinationDate DESC;`;
    console.log(sql);

    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }

        console.log(result);

        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result));
        response.end();
    });
}