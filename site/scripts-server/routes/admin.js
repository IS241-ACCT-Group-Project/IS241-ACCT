module.exports = function (app) {
    app.get("/admin", homepage);
    app.get("/databasetesting", database);
}

const db = require("../db");
const validate = require("../validate");
const path = require("path");
const fs = require("fs");

function homepage(request, response) {
    validate(request, response, "admin", function (isValid) {
        if (isValid) {
            response.sendFile("admindex.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}

function database(request, response) {
    validate(request, response, "admin", function (accID) {
        if (accID) {
            const sql = `SELECT AccountUsername FROM ACCOUNT WHERE AccountID = ${accID};`;

            db.pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    // throw err;
                    return;
                }

                fs.readFile(path.resolve(__dirname, "../../databaseTesting.html"), function (err, data) {
                    const newhtml = data.toString().replace(
                        `NOT LOGGED IN`,
                        `${result[0].AccountUsername} <a href="/logout">Log out</a>`
                    );
                    
                    response.setHeader('Content-Type', 'text/html');
                    response.write(newhtml);
                    response.end();
                });
            });

            // response.sendFile("databaseTesting.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}