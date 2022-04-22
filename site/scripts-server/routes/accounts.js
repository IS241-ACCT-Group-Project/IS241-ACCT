module.exports = function (app) {
    app.post("/checkUsernameExists", checkUsernameExists);
    app.post("/createAccount", createAccount);
    // app.post("/login", logIn);


    //from https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
    var session = require("express-session");
    const miliseconds = 1000 * 60 * 5; //five minutes

    app.use(session({
        secret: "SHHH! NOT SO LOUD!",
        saveUninitialized: true,
        cookie: {
            maxAge: miliseconds
        },
        resave: false
    }));
}

const bcrypt = require("bcrypt");
const db = require("./../db");
const saltRounds = 10;
var sess; //temporary

function checkUsernameExists(request, response) {
    const username = db.escape(request.body);
    console.log("Check username exists recieved request for: " + username);

    response.setHeader("Content-Type", "application/json");

    var sql = `SELECT 1 FROM ACCOUNT WHERE AccountUsername = ${username};`;

    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        //if (result && result.length > 0) {
        //    console.log(`Username ${username} is TAKEN`);
        //}
        //else {
        //    console.log(`Username ${username} is available!`);
        //}

        response.write(JSON.stringify(result));
        response.end();
    });

    //temporary for getting starting database entries
    //bcrypt.hash(username, saltRounds, function (err, hash) {
    //    console.log("Hash of password " + username + ": \n" + hash);
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
    // console.log(sql);

    //attempt to execute sql
    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        if (result.length > 0) {

            const hash = result[0].AccountPassword;

            bcrypt.compare(password, hash, function (err, result) {
                if (result) { //if password matches hash
                    console.log(`Log in user ${username}: Success!`);

                    sess = request.session;
                    sess.userid = request.body.username;
                    console.log(request.session);

                    response.redirect("/homelanding");
                } else {
                    console.log(`Log in user ${username}: FAILED!`);
                }
            });

            response.setHeader("Content-Type", "application/json");
            // response.write(JSON.stringify());
            response.end();
        } else {
            //no account with username exists
        }
    });
}