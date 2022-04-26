const fs = require("fs");
const db = require("./db");
const path = require("path");

module.exports = function (request, response, userType = null, callback) {
    const sessionID = db.pool.escape(request.sessionID);
    
    const sql = `SELECT expires, data FROM SESSIONS WHERE session_id = ${sessionID};`;
    
    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }

        var entry;
        var message = "";
        var data;

        if (entry = result[0]) {
            data = JSON.parse(entry.data);
            const resultUserType = data.associatedType;

            const currentTime = Date.now();
            if (entry.expires > currentTime) {
                console.log(`The cookie for ${data.username} has expired.`);
                message = `Your session has expired. Please <a href="/login">log in</a> again.`;
            }
            else if (userType != null && (resultUserType != userType && resultUserType != "admin")) {
                console.log(`User ${data.username} is attempting to access a page they do not have permissions for.`);
                message = `Your account does not have access to this page. Please <a href="/login">log in</a> with a different account.`;
            }
        }
        else {
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

        if (message == "") {
            callback(data.accountID);
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
                        `<p>The error will appear here with a link to <a href="/login">log in</a>.</p>`,
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
}