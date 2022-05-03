module.exports = function (app) {
    app.get("/site", homepage);
    app.get("/newsite", newSite);

    // app.get("/currentsitename", currentSiteID);
}

const db = require("./../db");
const validate = require("../validate");
const stats = require("./stats");
const path = require("path");

function homepage(request, response) {
    validate(request, response, "site", function (isValid) {
        if (isValid) {
            response.sendFile("siteHomePage.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}

function newSite(request, response) {
    validate(request, response, "site", function (isValid) {
        if (isValid) {
            response.sendFile("siteRegistration.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}

// function currentSiteID(request, response) {
    // validate(request, response, "site", function (accountID, associatedID) {
        // response.setHeader("Content-Type", "application/json");
// 
        // if (associatedID) {
            // response.write(JSON.stringify(associatedID));
        // }
        // else {
            // response.write(JSON.stringify(""));
        // }
// 
        // response.end();
    // });
// }