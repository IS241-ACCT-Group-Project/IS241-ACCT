//var form;
//
//window.addEventListener("load", function () {
//    form = document.getElementById("createAccount");
//    form.addEventListener("submit", createAccount);
//});
//
//function createAccount(event) {
//    event.preventDefault();
//
//    //console.log(JSON.stringify(form));
//
//    const data = new FormData(event.target);
//    const value = Object.fromEntries(data.entries());
//
//    //console.log(value);
//
//    fetch("http://localhost:8081/createAccount"

var username, password_1, password_2;
var usernameValid = false;

window.addEventListener("load", function () {
    username = document.getElementsByName("username");
    password_1 = document.getElementsByName("password-1");
    password_2 = document.getElementsByName("password-2");

    username.on("blur", function () {
        var input = username.val();
        var usernameValid = false;

        if (input == "") {
            return;
        }
        //client-side validations here
        else if (false) { //client-side validation checks here. maybe multiple else ifs for each check? (for better error messages)
            //tell user the validation error
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
                }
                else {
                    //set username as available here
                    usernameValid = true;
                }
            });
    });
});