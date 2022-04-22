module.exports = function (app) {
    //from https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
    var session = require("express-session");
    const miliseconds = 1000 * 60 * 5; //five minutes

    app.use(session({
        secret: "SHHH! NOT SO LOUD!",
        saveUninitialized: true,
        store: db.sessionStore, 
        cookie: {
            maxAge: miliseconds
        },
        resave: false
    }));

    // var cookieParser = require("cookie-parser");
    // app.use(cookieParser("SHHH! NOT SO LOUD!"));


    app.post("/checkUsernameExists", checkUsernameExists);
    app.post("/createAccount", createAccount);
    app.post("/login", logIn);
}

const bcrypt = require("bcrypt");
const db = require("./../db");
const saltRounds = 10;
var sess; //temporary


function checkUsernameExists(request, response) {
    const username = db.pool.escape(request.body);
    console.log("Check username exists recieved request for: " + username);

    response.setHeader("Content-Type", "application/json");

    var sql = `SELECT 1 FROM ACCOUNT WHERE AccountUsername = ${username};`;

    db.pool.query(sql, function (err, result) {
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

    const username = db.pool.escape(request.body.username);
    const password = db.pool.escape(request.body.password_1);
    const type = db.pool.escape(request.body.accountType);

    const sql = `INSERT INTO ACCOUNT (AssociatedType, AssociatedID, AccountUsername, AccountPassword) VALUES (${type}, ${4}, ${username}, ${password});`
    
    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        //response.sendFile("../site/login.html");
        response.statusCode = 204; //do not leave page
        response.end();
    });
}

function logIn(request, response) {
    const username = db.pool.escape(request.body.username);
    const password = request.body.password;

    var sql = `SELECT AccountID, AssociatedType, AssociatedID, AccountPassword FROM ACCOUNT WHERE AccountUsername = ${username};`;
    // console.log(sql);

    //attempt to execute sql
    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            //throw err;
            return;
        }

        if (result.length > 0) {

            const hash = result[0].AccountPassword;
            const accountID = result[0].AccountID;
            const associatedType = result[0].AssociatedType;
            const associatedID = result[0].AssociatedID;

            // response.setHeader("Content-Type", "text/html");

            bcrypt.compare(password, hash, function (err, result) {
                if (result) { //if password matches hash
                    console.log(`Log in user ${username}: Success!`);

                    request.session.accountID = accountID;
                    request.session.associatedType = associatedType;
                    request.session.associatedID = associatedID;
                    request.session.username = request.body.username;
                    
                    console.log(request.session);

                    response.redirect("/injectorhome");
                } else {
                    console.log(`Log in user ${username}: FAILED!`);
                    //response.write(`<h1>You are not logged in.</h1>`);
                    // response.end(`<h1>Login failed.</h1>`);
                }
            });

            // response.setHeader("Content-Type", "application/json");
            // response.write(JSON.stringify());
            // response.end();
        } else {
            //no account with username exists
            // response.end(`<h1>Login failed.</h1>`);
        }
    });
}