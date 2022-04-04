const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function (app) {
    app.post("/checkUsernameExists", checkUsernameExists);
    app.post("/createAccount", createAccount);
}

function checkUsernameExists(request, response) {
    const plaintextPassword = request.body;
    console.log("Check username exists recieved request for: " + plaintextPassword);

    //temporary for getting starting database entries
    bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
        console.log("Hash of password " + plaintextPassword + ": \n" + hash);
        //store hash
    });
}

function createAccount(request, response) {
    console.log("CREATE ACCOUNT");

    const username = connection.escape(request.body.username);
    const password = connection.escape(request.body.password_1);
}