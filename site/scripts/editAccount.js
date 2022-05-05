var loginForm, siteForm, injectorForm, usernameDisplay, phoneField, siteID, siteName;
var username, password_1, password_2, accountTypes, submitButton;
var loginMsg, originalLoginMsg, siteMsg, originalSiteMsg, injectorMsg, originalInjectorMsg;
var usernameValid = true;
var passwordValid = true;
var siteValid = true;
var profileData;

window.addEventListener("load", function () {
    // @ts-ignore
    profileData = profiledata;
    // console.log(JSON.stringify(profileData));
    console.log(profileData);

    usernameDisplay = document.getElementsByTagName("strong")[0];
    // console.log(usernameDisplay);

    if (loginForm = document.getElementById("editLogin")) {
        loginForm.addEventListener("submit", submitLogin);

        username = document.getElementsByName("username")[0];
        username.addEventListener("input", validateUsername);
        username.addEventListener("propertychange", validateUsername);
        // console.log("Username listeners added.");

        password_1 = document.getElementsByName("password_1")[0];
        password_1.addEventListener("input", validatePasswords);
        password_1.addEventListener("propertychange", validatePasswords);

        password_2 = document.getElementsByName("password_2")[0];
        password_2.addEventListener("input", validatePasswords);
        password_2.addEventListener("propertychange", validatePasswords);

        submitButton = document.getElementById("submitAccountButton");
        submitButton.disabled = false; //only enable button when input is valid

        if (loginMsg = document.getElementById("changeLoginMsg")) {
            console.log(loginMsg);
            loginMsg.hidden = true;
            originalLoginMsg = loginMsg.innerHTML;
            // console.log(originalLoginMsg);
        }
    }

    if (phoneField = document.getElementsByName("phone")[0]){
        phoneField.addEventListener("input", formatPhoneField);
        phoneField.addEventListener("propertychange", formatPhoneField);
        // console.log(phoneField);
    }

    if (siteForm = document.getElementById("editSite")) {
        resetSite();
        document.getElementById("resetSite").addEventListener("click", resetSite);
        siteForm.addEventListener("submit", submitSite);

        if (siteMsg = document.getElementById("changeSiteMsg")) {
            siteMsg.hidden = true;
            originalSiteMsg = siteMsg.innerHTML;
            // console.log(originalSiteMsg);
        }
    }

    if (injectorForm = document.getElementById("editInjector")) {
        resetInjector();
        document.getElementById("resetInjector").addEventListener("click", resetInjector);
        injectorForm.addEventListener("submit", submitInjector);

        siteID = document.getElementsByName("siteID")[0];
        siteID.addEventListener("input", validateSiteID);
        siteID.addEventListener("propertychange", validateSiteID);

        siteName = document.getElementById("siteName");

        if (injectorMsg = document.getElementById("changeInjectorMsg")) {
            injectorMsg.hidden = true;
            originalInjectorMsg = injectorMsg.innerHTML;
            // console.log(originalInjectorMsg);
        }
    }

    if (profileData.SiteID) {
        resetSite();
    }
    if (profileData.InjectorID) {
        resetInjector();
    }
});

// #region login validation
function validateUsername() {
    var input = username.value;
    // console.log("input is " + input);
    usernameValid = false;

    if (input == "") { //may not be changing username
        usernameValid = true;
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

    fetch("https://server.acct-vaxtracker.me/checkUsernameExists", {
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
        //user may not be changing password
        passwordValid = true;
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

function checkAllValid() {
    var disabled = submitButton.disabled;

    if (disabled && usernameValid && passwordValid) {
        console.log("Submit button is enabled.");
        submitButton.disabled = false;
    }
    else if (!disabled && (!usernameValid || !passwordValid)) {
        console.log("Submit button is disabled.");
        submitButton.disabled = true;
    }
}
// #endregion

function formatPhoneField() {
    const pfLength = phoneField.value.length;
    const pfValue = phoneField.value.replaceAll("-", "");

    if (pfLength > 7) {
        phoneField.value = (pfValue.slice(0, 3) + "-" + pfValue.slice(3, 6) + "-" + pfValue.slice(6));
        // console.log("length is greater than 7");
    }
    else if (pfLength <= 7 && pfLength > 3) {
       phoneField.value = pfValue.slice(0, 3) + "-" + pfValue.slice(3);
    //    console.log("length is between 3 and 7");
    }
}

function validateSiteID() {
    // console.log("input is " + injectorForm.elements["siteID"].value);
    var input = injectorForm.elements["siteID"].value;
    siteValid = false;

    if (input == "") { //may not be adding site id
        siteValid = true;
        return;
    }

    fetch("https://server.acct-vaxtracker.me/siteexists", {
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
    .then(function (site) {
        // console.log(site.SiteID);

        if (site.SiteID > -1) {
            // console.log("Site #" + input + " exists.");

            var address="<i>No address available</i>";
            if (site.SiteAddress != null) {
                address = site.SiteAddress;
            }

            siteName.innerHTML = `${site.SiteName}<br>${address}`;
            siteValid = true;
        }
        else if (site.SiteID == null) {
            // console.log("Site #" + input + " does not exist.");
            
            siteName.innerHTML = `Site #${input} does not exist.`;
            siteValid = false;
        }
        else {
            console.log("Error checking if site exists");
            siteValid = false;
        }
    });
}

function submitLogin(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    const newUsername = username.value;

    // console.log(value);

    fetch("https://server.acct-vaxtracker.me/editLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            if (data == "success") {
                usernameDisplay.innerHTML = newUsername;
                loginMsg.innerHTML = originalLoginMsg;
                loginMsg.hidden = false;
                loginForm.reset();
            }
            else {
                loginMsg.textContent = data;
                loginMsg.hidden = false;
            }
        });
}

function submitSite(event) {
    event.preventDefault();

    // console.log(JSON.stringify(siteForm));

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    // console.log(value);

    fetch("https://server.acct-vaxtracker.me/editsite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value)
    })
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data[0]);
            if (data.length > 0) {
                profileData = data[0];

                siteMsg.innerHTML = originalSiteMsg;
                siteMsg.hidden = false;
                siteForm.reset();
                resetSite();
            }
            else {
                siteMsg.textContent = "There was an error updating site information. Please try again.";
                siteMsg.hidden = false;
            }
        });
}

function resetSite() {
    siteForm.elements["name"].value = profileData.SiteName;
    siteForm.elements["address"].value = profileData.SiteAddress;
    siteForm.elements["zipCode"].value = profileData.SiteZipCode;
    siteForm.elements["phone"].value = profileData.SitePhoneNumber;
    formatPhoneField();
}

function submitInjector(event) {
    event.preventDefault();

    if (!siteValid) {
        alert("Please enter a valid site ID or leave blank.");
        return;
    }

    // console.log(JSON.stringify(siteForm));

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    // console.log(value);

    fetch("https://server.acct-vaxtracker.me/editinjector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value)
    })
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);
            console.log(profileData);

            // profileData = data[0];
            // injectorForm.reset();
            // resetInjector();

            if (data.length > 0) {
                profileData = data[0];

                injectorMsg.innerHTML = originalInjectorMsg;
                injectorMsg.hidden = false;
                injectorForm.reset();
                resetInjector();
            }
            else {
                injectorMsg.textContent = "There was an error updating injector information. Please try again.";
                injectorMsg.hidden = false;
            }
        });
}

function resetInjector() {
    injectorForm.elements["firstName"].value = profileData.FirstName;
    injectorForm.elements["lastName"].value = profileData.LastName;
    if (injectorForm.elements["siteID"].value = profileData.SiteID) {
        validateSiteID();
    }
}