var newUserForm;
var username, password_1, password_2, accountTypes, submitButton;
var newUserMsg, originalNewUserMsg;
var usernameValid = false;
var passwordValid = false;

window.addEventListener("load", function () {
    newUserForm = document.getElementById("newUserForm");

    if (username = document.getElementsByName("username")[0]) {
        username.addEventListener("input", validateUsername);
        username.addEventListener("propertychange", validateUsername);
        // console.log("Username listeners added.");
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

    if (submitButton = document.getElementById("submitAccountButton")) {
        submitButton.disabled = true; //only enable button when input is valid
    }

    if (newUserMsg = document.getElementById("newUserMsg")) {
        newUserMsg.hidden = true;
        originalNewUserMsg = newUserMsg.innerHTML;
        // console.log(originalNewUserMsg);
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
function hasRequiredCharacters() {

    const password1 = password_1.value.trim();
    // If password not entered
    if (password1 == '') {
        alert("Please enter Password");
        return false
    }
    //Length Check
    if (password1.length < 8) {
        alert("Invalid Password. Password must be at least 8 characters long.");
        return false;
    }
    //Contains Number Check
    var numbers = /[0-9]/g;
    if (!password1.match(numbers)) {
        alert("Invalid Password. Password must contain at least one number (0-9).");
        return false;
    }
    //Contains Capital Letter
    var uppercase = /[A-Z]/g;
    if (!password1.match(uppercase)) {
        alert("Invalid Password. Password must contain at least one upper case letter (A-Z).");
        return false;
    }
    //Contains Lowercase Letter
    var lowercase = /[a-z]/g;
    if (!password1.match(lowercase)) {
        alert("Invalid Password. Password must contain at least one lower case letter (a-z).");
        return false;
    }
    // If same return True.
    else {
        alert("Passwords Match!");
        return true;
    }
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

function createAccount(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    fetch("http://localhost:8081/createaccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        })
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data);

            if (data == "success") {
                newUserMsg.innerHTML = originalNewUserMsg;
                newUserMsg.hidden = false;
                newUserForm.reset();
            }
            else {
                newUserMsg.innerHTML = data;
                newUserMsg.hidden = false;
            }
        });
}