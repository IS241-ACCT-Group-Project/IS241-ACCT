function listDB() {
    fetch("http://localhost:8081/listvaccinators")
        .then(response => response.json())
        .then(data => console.log(data));
}

function submitForm() {
    // @ts-ignore
    var FirstName = document.getElementById("firstName").value;
    // @ts-ignore
    var LastName = document.getElementById("lastName").value;
    // @ts-ignore
    var ClinicID = document.getElementById("clinicID").value;

    console.log(FirstName);
    console.log(LastName);
    console.log(ClinicID);

    fetch("http://localhost:8081/addvaccinator", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "FirstName": FirstName,
                "LastName": LastName,
                "ClinicID": ClinicID
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success: ", data);
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
}