module.exports = function (app) {
    app.get("/injectorhome", homepage);
    app.get("/newvaccination", newVaccination);
    app.get("/newpatient", newPatient);
    
}

const path = require("path");

function homepage(request, response) {
    response.sendFile("injectorHomePage.html", { root: path.resolve(__dirname, "../../") });
}

function newVaccination(request, response) {
    response.sendFile("injectorEntersVaccination.html", { root: path.resolve(__dirname, "../../") });
}

function newPatient(request, response) {
    response.sendFile("newPatientForm.html", { root: path.resolve(__dirname, "../../") });
}