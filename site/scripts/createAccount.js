var username, password_1, password_2, submitButton;
var usernameValid = false;
var passwordValid = false;

window.addEventListener("load", function () {
    if (username = document.getElementsByName("username")[0]) {
        username.addEventListener("input", validateUsername);
        username.addEventListener("propertychange", validateUsername);
    }

    if (password_1 = document.getElementsByName("password_1")[0]) {
        password_1.addEventListener("input", validatePasswords);
        password_1.addEventListener("propertychange", validatePasswords);
    }
    if (password_2 = document.getElementsByName("password_2")[0]) {
        password_2.addEventListener("input", validatePasswords);
        password_2.addEventListener("propertychange", validatePasswords);
    }

    if (submitButton = document.getElementById("registerAccountButton")) {
        submitButton.disabled = true; //only enable button when input is valid
    }
});

function validateUsername() {
    var input = username.value;
    // console.log("input is " + input);
    var usernameValid = false;

    if (input == "") {
        checkAllValid();
        return;
    }
    //client-side validations here
    else if (false) { //client-side validation checks here. maybe multiple else ifs for each check? (whatever gives better error messages)
        //tell user the validation error
        checkAllValid(); //disable submit if enabled
        return; //exit function without calling server
    }

    //play a loading animation here if this ends up taking a while

    fetch("http://localhost:8081/checkUsernameExists", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: input
    })
    .then(function (response) {
        //console.log(response);
        return response.json();
    }).then(function (data) {
        //console.log(data);

        if (data.exists) {
            //set username as taken here
            console.log("Username " + username.text + " is taken.");
        }
        else {
            //set username as available here
            console.log("Username " + username.text + " is available.");

            usernameValid = true;
            checkAllValid();
        }
    });
}

function validatePasswords() {
    passwordValid = false;

    console.log("Password field 1 contains: " + password_1.value);

    const pwText_1 = password_1.value.trim();
    const pwText_2 = password_2.value.trim();

    if (pwText_2 == "" && pwText_1 == "") {
        //don't show error (user probably still entering form)
    }
    else if (pwText_1.includes("`")) { //check for forbidden characters - maybe make this regex
        //show message about having a forbidden character
    }
    else if (pwText_1 != pwText_2) {
        //show message that passwords don't match
    }
    else if (hasRequiredCharacters(pwText_1)) {
        //messages handled in hasRequiredCharacters
        passwordValid = true;
    }

    checkAllValid();
}

//validate password here
//doesn't currently work; needs to be fixed
function hasRequiredCharacters(password) {
    return true; //skipping everything because this doesn't work

    const length = 8;
    const lowerLetter = "/^[a-z]$/";
    const upperLetter = new RegExp("A-Z");
    const number = new RegExp("");
    const charList = new RegExp(",./<>?!@#$%^&*()");

    var isValid = true;

    // console.log(lowerLetter.test(password));
    console.log(password.match(lowerLetter));

    if (password.length < length) {
        console.log("Password must be at least " + length + " characters long.");
        //display message to user

        isValid = false;
    }
    if (!lowerLetter.test(password)) {
        console.log("Password does not contain lowercase letter.");
        //display message to user

        isValid = false;
    }
    if (!upperLetter.test(password)) {
        console.log("Password does not contain lowercase letter.");
        //display message to user

        isValid = false;
    }
    //and so on...

    if (!isValid) {
        passwordValid = false;
    }

    return isValid;
}

//check if form is filled out correctly and disable/enable button accordingly
function checkAllValid() {
    if (usernameValid && passwordValid) {
        submitButton.disabled = true;
    }
    else {
        submitButton.disabled = false;
    }
}