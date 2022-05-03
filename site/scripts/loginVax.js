var loginForm, loginButton, loginErrorMsg, errorMsgDisplay;

window.addEventListener("load", function () {
    loginForm = document.getElementById("login-form");
    loginButton = document.getElementById("login-form-submit");
    if (loginErrorMsg = document.getElementById("login-error-msg")) {
        errorMsgDisplay = loginErrorMsg.style.display;
        loginErrorMsg.style.display = "none";
    }

    loginForm.addEventListener("submit", submitForm);
});

function submitForm (event) {
    // event.preventDefault();

    delay(500).then(function () {
        loginErrorMsg.style.display = errorMsgDisplay;
    });

    //this can't work because it stops the server from redirecting user so they keep the same session ID
    // console.log(JSON.stringify(loginForm));
    //const data = new FormData(loginForm);
    //const value = Object.fromEntries(data.entries());
//
    //fetch("/login", {
    //    method: "POST",
    //    headers: {
    //        "Content-Type": "application/json"
    //    },
    //    body: JSON.stringify(value)
    //})
    //    .then(function (response) {
    //        if (response.status == 201) {
    //            console.log("OK");
    //            location.href = "http://localhost:8081/accounthome";
    //        }
    //        // console.log(response.json());
    //        // return JSON.stringify(response.json());
    //    });

    //if ((username === "XiomaraAdmin" || username === "SurveyUser") && password === "somethingsafe") {
    //    alert("You have successfully logged in.");
    //    location.reload();
    //} else {
    //    loginErrorMsg.style.opacity = 1;
    //}
}

function delay(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}