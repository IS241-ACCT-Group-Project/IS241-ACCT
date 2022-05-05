const fs = require("fs");
const db = require("./db");
const path = require("path");

module.exports = function (request, response, userType = null, callback) {
    const sessionID = db.pool.escape(request.sessionID);
    
    const sql = `SELECT expires, data FROM sessions WHERE session_id = ${sessionID};`;

    var message = "";
    var data;
    var entry;

    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }

        var sql2 = `SELECT 1 FROM ACCOUNT;`;

        if (result.length < 1) { //if no sessionID in database
            console.log(`No session ID found in database for session ${sessionID}`);
            message = `We could not find an active session for your account. There a few possible resons for this:</p>
                            <ul>
                                <li>You are not be logged in.</li>
                                <li>You were logged out for inactivity.</li>
                                <li>There was an error in the server when retrieving your data.</li>
                                <li>Your brower's session data has been maliciously altered.</li>
                            </ul>
                            <p>Please <a href="/login">log in</a>.`;
        }
        else {
            data = result[0];
            entry = JSON.parse(result[0].data);

            sql2 = `SELECT * FROM ACCOUNT WHERE AccountID = '${entry.accountID}';`;
        }

        db.pool.query(sql2, function (err, result2) {
            if (err) {
                console.log(err);
                // throw err;
                return;
            }

            const accData = result2[0];

            if (result2.length == 1) { //there will always be more than one account if sql2 is not changed
                const resultUserType = accData.AssociatedType;

                const currentTime = Date.now();
                if (result[0].expires > currentTime) {
                    console.log(`The cookie for ${accData.AccountUsername} has expired.`);
                    message = `Your session has expired. Please <a href="/login">log in</a> again.`;
                }
                else if (userType != null && (resultUserType != userType && resultUserType != "admin")) {
                    console.log(`User ${accData.AccountUsername} is attempting to access a page they do not have permissions for.`);
                    message = `Your account is a${typeString(resultUserType)} account and does not have access to this information. Please go back or <a href="/logout">log out</a> and log in with a${typeString(userType, true)} account to view this information.`;
                }
            }
            else if (message == "") { //put this here to avoid asyc problems
                console.log(`Session ID ${sessionID} exists in database but is not logged in.`);
                message = `We could not find an active session for your account. There a few possible resons for this:</p>
                            <ul>
                                <li>You are not be logged in.</li>
                                <li>You were logged out for inactivity.</li>
                                <li>There was an error in the server when retrieving your data.</li>
                                <li>Your brower's session data has been maliciously altered.</li>
                            </ul>
                            <p>Please <a href="/login">log in</a>.`;
            }

            if (message == "") {
                callback(accData.AccountID, accData.AssociatedID);
            }
            else {
                fs.readFile(path.resolve(__dirname, "../permissionDenied.html"), function (err, data) {
                    if (err) {
                        response.writeHead(404);
                        response.write("File not found.");

                        callback(false);
                    }
                    else {
                        const newhtml = data.toString().replace(
                            `<p>The error will appear here with a link to <a href="http://localhost:8081/login">log in</a>.</p>`,
                            `<p>${message}</p>`
                        );

                        response.writeHead(401, { 'Content-Type': 'text/html' });
                        response.write(newhtml);
                        response.end();

                        callback(false);
                    }
                });
            }
        });
    });
}

function typeString(accType, orAdmin = false) {
    var str;

    switch (accType) {
        case null:
        case "admin":
            str = "n Administrator";
            break;
        case "cdc":
            str = " CDC";
            break;
        case "injector":
            str = "n Injector";
            break;
        case "site":
            str = " Site";
            break;
    }

    if (orAdmin && (accType != "admin" || accType != null)) {
        return str + " or Administrator";
    }
    else {
        return str;
    }
}