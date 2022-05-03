module.exports = function (app) {
    //from https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
    var session = require("express-session");
    const miliseconds = 1000 * 60 * 10; //ten minutes

    app.use(session({
        secret: "SHHH! NOT SO LOUD!",
        saveUninitialized: true,
        store: db.sessionStore, 
        cookie: {
            maxAge: miliseconds
        },
        resave: false
    }));

    app.post("/checkUsernameExists", checkUsernameExists);
    app.post("/createAccount", createAccount);
    app.post("/editlogin", editLogin);
    app.post("/login", logIn);
    app.get("/login", sendLogin);
    app.get("/logout", logOut);
    app.get("/accounthome", accountHome);
    app.get("/editaccount", editAccount);
}

const bcrypt = require("bcrypt");
const db = require("./../db");
const path = require("path");
const validate = require("../validate");
const audit = require("../audit");
const fs = require("fs");
const saltRounds = 10;


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
}

function createAccount(request, response) {
    console.log("CREATE ACCOUNT");

    const username = db.pool.escape(request.body.username);
    const type = db.pool.escape(request.body.accountType);

    db.pool.escape(bcrypt.hash(request.body.password_1, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
            // throw err;
        }

        hash = db.pool.escape(hash);
        const sql = `INSERT INTO ACCOUNT (AssociatedType, AccountUsername, AccountPassword) VALUES (${type}, ${username}, ${hash});`;
        const sql2 = ` SELECT * FROM ACCOUNT WHERE AccountUsername = ${username};`;

        db.pool.query((sql + sql2), function (err, result) {
            if (err) {
                console.log(err);
                //throw err;
                return;
            }

            audit(result[1][0].AccountID, "add", sql.replace(hash, "****"));

            //response.sendFile("../site/login.html");
            response.statusCode = 204; //do not leave page
            response.end();
        });
    }));
}

function editLogin(request, response) {
    validate(request, response, null, function (valid) {
        if (valid) {
            response.setHeader("Content-Type", "application/json");

            var message = "success";
            const sql = `SELECT * FROM ACCOUNT WHERE AccountID = ${valid}`;

            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    // throw err;
                    return;
                }

                if (result.length > 0) {
                    const oldPassword = request.body.oldpassword;
                    const currentHash = result[0].AccountPassword;
                    var username = db.pool.escape(request.body.username);
                    if (username == `''`) { username = db.pool.escape(result[0].AccountUsername); }
                    var newPassword = request.body.password_1;
                    if (newPassword == ``) { newPassword = oldPassword; }

                    bcrypt.compare(oldPassword, currentHash, function (err, successful) {
                        if (successful) {
                            db.pool.escape(bcrypt.hash(newPassword, saltRounds, function (err, newHash) {
                                if (err) {
                                    console.log(err);
                                    // throw err;
                                }
                                
                                const sql2 = `UPDATE ACCOUNT SET AccountUsername = ${username}, AccountPassword = '${newHash}' WHERE AccountID = ${valid};`;
                                db.pool.query(sql2, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        // throw err;
                                        return;
                                    }

                                    audit(valid, "edit", sql2.replace(newHash, "****"));

                                    // response.statusCode = 204; //do not leave web page
                                    response.write(JSON.stringify("success"));
                                    response.end();
                                });
                            }));
                        }
                        else {
                            response.statusCode = 204; //do not leave web page
                            response.write(JSON.stringify("Account password is incorrect."));
                            response.end();
                        }
                    });
                }
                else {
                    response.statusCode = 204; //do not leave web page
                    response.write(JSON.stringify("Account not found."));
                    response.end();
                }
            });

            // response.setHeader("Content-Type", "application/json");
            // response.write(JSON.stringify(message));
            // response.end();
        }
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
                    audit(accountID, "login");

                    request.session.accountID = accountID;
                    request.session.associatedType = associatedType;
                    request.session.associatedID = associatedID;
                    request.session.username = request.body.username;
                    
                    // console.log(request.session);

                    // response.writeHead(201);
                    switch (associatedType) {
                        case "injector":
                            response.redirect("/injector");
                            break;
                        case "admin":
                            response.redirect("/admin");
                            break;
                        case "site":
                            response.redirect("/site");
                            // response.redirect("/editaccount"); //not sure if site gets a homepage so take right to edit acc
                            break;
                    }
                    // response.redirect("/accounthome");
                }
                else {
                    console.log(`Log in user ${username}: FAILED!`);
                }
            });
        }
        else {
            //no account with username exists
            response.writeHead(404);
            response.end();
        }
    });
}

function sendLogin(request, response) {
    const sessionID = db.pool.escape(request.sessionID);

    const sql = `SELECT expires, data FROM sessions WHERE session_id = ${sessionID};`;
    // validate(request, response, null, function (accountID) {

    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }

        var entry;
        var data;

        if (entry = result[0]) {
            data = JSON.parse(entry.data);

            const currentTime = Date.now();
            if (entry.expires > currentTime) {
                response.sendFile("login.html", { root: path.resolve(__dirname, "../../") });
            }
            else {
                const sql2 = `SELECT AccountUsername FROM ACCOUNT WHERE AccountID = '${data.accountID}';`;

                db.pool.query(sql2, function (err, result2) {
                    if (err) {
                        console.log(err);
                        // throw err;
                        return;
                    }

                    if (result2[0]) {
                        fs.readFile(path.resolve(__dirname, "../../alreadyLoggedIn.html"), function (err, data) {
                            if (err) {
                                response.writeHead(404);
                                response.write("File not found.");
                            }
                            else {
                                const newhtml = data.toString().replace(
                                    `<strong>USER</strong>`,
                                    `<strong>${result2[0].AccountUsername}</strong>`
                                );

                                response.writeHead(401, { 'Content-Type': 'text/html' });
                                response.write(newhtml);
                                response.end();
                            }
                        });
                    }
                    // response.sendFile("login.html", { root: path.resolve(__dirname, "../../") });
                    else {
                        response.sendFile("login.html", { root: path.resolve(__dirname, "../../") });
                    }
                });
            }
        }
        else {
            response.sendFile("login.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}

function logOut(request, response) {
    request.session.destroy(function (err) {
        if (err) {
            console.log(err);
            // throw err;
        }
        else {
            response.sendFile("loggedOut.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}

function accountHome(request, response) {
    validate(request, response, null, function (valid) {
        if (valid) {
            const sessionID = db.pool.escape(request.sessionID);
            const sql = `SELECT data FROM sessions WHERE session_id = ${sessionID};`;
            
            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    // throw err;
                    return;
                }

                var userType;
                if (userType = JSON.parse(result[0].data)) {
                    switch (userType.associatedType) {
                        case "injector":
                            response.redirect("/injector");
                            break;
                        case "admin":
                            response.redirect("/admin");
                            break;
                        case "site":
                            response.redirect("/site");
                            break;
                    }
                }
            });
        }
    });
}

function editAccount(request, response) {
    validate(request, response, null, function (valid) {
        if (valid) {
            const sessionID = db.pool.escape(request.sessionID);
            const sql = `SELECT data FROM sessions WHERE session_id = ${sessionID};`;
            
            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    // throw err;
                    return;
                }

                fs.readFile(path.resolve(__dirname, "../../editUser.html"), function (err, file) {
                    if (err) {
                        response.writeHead(404);
                        response.write("File not found.");
                    }
                    else {

                        // var userType;// = data.associatedType;
                        var entry;
                        var newhtml = file.toString();

                        if (entry = JSON.parse(result[0].data)) {
                            const userType = entry.associatedType;

                            newhtml = newhtml.replace(
                                `USERNAME_HERE`,
                                `${entry.username}`
                            );

                            if (userType == "injector") {
                                newhtml = newhtml.replace(
                                    `id="editSite"`,
                                    `id="editSite" style="display:none;"`
                                );

                                const injectorSql = `SELECT * FROM INJECTOR WHERE InjectorID = ${entry.associatedID};`;
                                db.pool.query(injectorSql, function (err, injectorData) {
                                    newhtml = newhtml.replace(
                                        `var profiledata;`,
                                        `var profiledata = ${JSON.stringify(injectorData[0])};`
                                    );

                                    response.setHeader("Content-Type", "text/html");
                                    response.write(newhtml);
                                    response.end();
                                });
                            }
                            else if (userType == "site") {
                                newhtml = newhtml.replace(
                                    `id="editInjector"`,
                                    `id="editInjector" style="display:none;"`
                                );

                                const siteSql = `SELECT * FROM SITE WHERE SiteID = ${entry.associatedID};`;
                                db.pool.query(siteSql, function (err, siteData) {
                                    newhtml = newhtml.replace(
                                        `var profiledata;`,
                                        // `var profiledata = 1;`
                                        `var profiledata = ${JSON.stringify(siteData[0])};`
                                    );
                                    response.setHeader("Content-Type", "text/html");
                                    response.write(newhtml);
                                    response.end();
                                });
                            }
                            else {
                                newhtml = newhtml.replace(
                                    `id="editInjector"`,
                                    `id="editInjector" style="display:none;"`
                                );
                                newhtml = newhtml.replace(
                                    `id="editSite"`,
                                    `id="editSite" style="display:none;"`
                                );

                                response.setHeader("Content-Type", "text/html");
                                response.write(newhtml);
                                response.end();
                            }
                        }

                        // response.setHeader("Content-Type", "text/html");
                        // response.write(newhtml);
                        // response.end();
                    }
                });
            });
        }
    });
}