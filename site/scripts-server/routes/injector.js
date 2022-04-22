module.exports = function (app) {
    app.get("/injectorhome", homepage);
    app.get("/newvaccination", newVaccination);
    app.get("/newpatient", newPatient);
    
}

const db = require("./../db");

const path = require("path");
// const cookieParser = require("cookie-parser");

function homepage(request, response) {
    response.sendFile("injectorHomePage.html", { root: path.resolve(__dirname, "../../") });
}

function newVaccination(request, response) {
    // const parsedCookie=cookieParser( request.cookie
    const sessionID = db.pool.escape(request.sessionID);

    const sql = `SELECT expires, data FROM SESSIONS WHERE session_id = ${sessionID};`;

    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        if (result[0]) {
            const data = JSON.parse(result[0].data);
            const resultUserType = data.associatedType;

            if (result[0].expires > Date.now()) {
                console.log(`The cookie for ${data.username} has expired.`);
            }
            else if (resultUserType != "injector" && resultUserType != "admin") {
                console.log(`User ${data.username} does not have permissions to view /newvaccination.`);
            }
            else {
                response.sendFile("injectorEntersVaccination.html", { root: path.resolve(__dirname, "../../") });
            }
        }
        else {
            console.log(`No session ID found in database for session ${sessionID}`);

            response.sendFile("permissionDenied.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}

function newPatient(request, response) {
    response.sendFile("newPatientForm.html", { root: path.resolve(__dirname, "../../") });
}