module.exports = function (app) {
    app.get("/injector", homepage);
    app.get("/newvaccination", newVaccination);
    app.get("/newpatient", newPatient);
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