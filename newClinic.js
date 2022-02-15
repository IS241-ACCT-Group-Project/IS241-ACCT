
const loginForm = document.getElementById("newClinicForm");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("insuffient-information-error-message");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = newClinicForm.value;
    const password = newClinicForm.value;

    if ( === "" &&  === "") {
        alert("You have successfully registered.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})