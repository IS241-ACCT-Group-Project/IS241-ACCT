var username, password_1, password_2, accountTypes, submitButton;
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

    if (accountTypes = document.getElementsByName("accountType")) {
        accountTypes.forEach(function (radioButton) {
            radioButton.addEventListener("click", checkAllValid);
        });
    }

    if (submitButton = document.getElementById("registerAccountButton")) {
        submitButton.disabled = true; //only enable button when input is valid
    }
});

function validateUsername() {
    var input = username.value;
    // console.log("input is " + input);
    usernameValid = false;

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
        // console.log(response);
        return response.json();
    })
    .then(function (matches) {
        // console.log("DATA TO COMPARE: " + JSON.stringify(matches));

        if (matches.length > 0) {
            //set username as taken here
            console.log("Username " + input + " is taken.");

            checkAllValid();
        }
        else if (matches.length == 0) {
            //set username as available here
            console.log("Username " + input + " is available.");

            usernameValid = true;
            checkAllValid();
        }
        else {
            console.log("Error checking if username exists");
        }
    });
}

function validatePasswords() {
    passwordValid = false;

    // console.log("Password field 1 contains: " + password_1.value);

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
        console.log("Passwords match and contain required characters.");
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

function isAccountTypeSelected() {
    var isSelected = false;

    accountTypes.forEach(function (radioButton) {
        // console.log("Is radio button checked: " + radioButton.checked);
        if (radioButton.checked) {
            isSelected = true;
        }
    });

    return isSelected;
}

//check if form is filled out correctly and disable/enable button accordingly
function checkAllValid() {
    var disabled = submitButton.disabled;
    var accountSelected = isAccountTypeSelected();
    // console.log("Is account type selected: " + accountSelected);

    if (disabled && usernameValid && passwordValid && accountSelected) {
        console.log("Submit button is enabled.");
        submitButton.disabled = false;
    }
    else if (!disabled && (!usernameValid || !passwordValid || !accountSelected)) {
        console.log("Submit button is disabled.");
        submitButton.disabled = true;
    }
    // else {
    //     console.log("Username valid: " + usernameValid);
    //     console.log("Password valid: " + passwordValid);
    // }
}