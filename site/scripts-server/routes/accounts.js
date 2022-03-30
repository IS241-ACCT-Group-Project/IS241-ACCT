module.exports = function (app) {
    app.post("/createAccount", createAccount);
}

function createAccount(request, response) {
    console.log("CREATE ACCOUNT");
}