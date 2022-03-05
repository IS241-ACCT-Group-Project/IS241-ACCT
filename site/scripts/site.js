//print whole database to console (debugging purposes only)
function listDB(database) {
    //fetch("http://localhost:8081/listinjectors")
    fetch("http://localhost:8081/list" + database)
        .then((response) => response.json())
        .then((data) => {
                console.log(`Showing all ${database.toUpperCase()} entries:`);
                console.log(data);
            });
}

//deprecated
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