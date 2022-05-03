module.exports = function (app) {
    app.get("/injector", homepage);
    app.get("/addinjectorinfo", newInjector);
    app.get("/newvaccination", newVaccination);
    app.get("/newpatient", newPatient);

    app.get("/currentinjectorid", currentInjectorID);
}

const db = require("./../db");
const validate = require("../validate");

const path = require("path");

function homepage(request, response) {
    validate(request, response, "injector", function (isValid) {
        if (isValid) {
            response.sendFile("injectorHomePage.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}

function newInjector(request, response) {
    validate(request, response, "injector", function (isValid) {
        if (isValid) {
            response.sendFile("injectorRegistration.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}

function newVaccination(request, response) {
    validate(request, response, "injector", function (isValid) {
        if (isValid) {
            response.sendFile("injectorEntersVaccination.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}

function newPatient(request, response) {
    validate(request, response, "injector", function (isValid) {
        if (isValid) {
            response.sendFile("newPatientForm.html", { root: path.resolve(__dirname, "../../") });
        }
    });
}

function currentInjectorID(request, response) {
    validate(request, response, "injector", function (accountID, associatedID) {
        response.setHeader("Content-Type", "application/json");

        if (associatedID) {
            response.write(JSON.stringify(associatedID));
        }
        else {
            response.write(JSON.stringify(""));
        }

        response.end();
    });
}