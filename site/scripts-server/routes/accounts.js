const bcrypt = require("bcrypt");
const db = require("./../db");
const saltRounds = 10;

module.exports = function (app) {
    app.post("/checkUsernameExists", checkUsernameExists);
    app.post("/createAccount", createAccount);
    app.post("/login", logIn);
}

function checkUsernameExists(request, response) {
    const plaintextPassword = request.body;
    console.log("Check username exists recieved request for: " + plaintextPassword);

    //temporary for getting starting database entries
    //bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
    //    console.log("Hash of password " + plaintextPassword + ": \n" + hash);
    //    //store hash
    //});
}

function createAccount(request, response) {
    console.log("CREATE ACCOUNT");

    const username = db.escape(request.body.username);
    const password = db.escape(request.body.password_1);
}

function logIn(request, response) {
    const username = db.escape(request.body.username);
    const password = request.body.password;

    var sql = `SELECT AccountPassword FROM ACCOUNT WHERE AccountUsername = ${username};`;
    console.log(sql);

    //attempt to execute sql
    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        const hash = result[0].AccountPassword;

        bcrypt.compare(password, hash, function (err, result) {
            if (result) { //if password matches hash
                console.log(`Log in user ${username}: Success!`);
            }
            else {
                console.log(`Log in user ${username}: FAILED!`);
            }
        });

        response.setHeader("Content-Type", "application/json");
        // response.write(JSON.stringify());
        response.end();
    });
}