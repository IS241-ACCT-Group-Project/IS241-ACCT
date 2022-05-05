var loginForm, loginButton, loginErrorMsg, errorMsgDisplay;

window.addEventListener("load", function () {
    loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", submitForm);
    loginButton = document.getElementById("login-form-submit");
    if (loginErrorMsg = document.getElementById("login-error-msg")) {
        errorMsgDisplay = loginErrorMsg.style.display;
        loginErrorMsg.style.display = "none";

        var username;
        if (username = document.getElementsByName("username")[0]) {
            username.addEventListener("input", hideLoginErrorMsg);
            username.addEventListener("propertychange", hideLoginErrorMsg);
        }

        var password;
        if (password = document.getElementsByName("password")[0]) {
            password.addEventListener("input", hideLoginErrorMsg);
            password.addEventListener("propertychange", hideLoginErrorMsg);
        }
    }
});

function submitForm(event) {
    event.preventDefault();

    const data = new FormData(loginForm);
    const value = Object.fromEntries(data.entries());

    fetch("https://server.acct-vaxtracker.me/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(value)
    })
        .then(function (response) {
            // console.log(response);
            // console.log(response.status);

            if (response.status >= 400) { //if unauthorized (errors 400+)
                // alert("Login failed. Please try again.");
                loginErrorMsg.style.display = errorMsgDisplay;
                // return null;
            }
            else {
                //else redirected to account home
                window.location.href = response.url;
            }
        });
}

function hideLoginErrorMsg() {
    loginErrorMsg.style.display = "none";
}