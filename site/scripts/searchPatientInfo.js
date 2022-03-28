var form;

window.addEventListener("load", function () {
    form = document.getElementById("patientInfoSearch");
    form.addEventListener("submit", searchPatientInfo);
});

function searchPatientInfo(event) {
    event.preventDefault();

    // console.log(JSON.stringify(form));

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    // console.log(value);

    fetch("http://localhost:8081/searchPatientInfo", {
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

            var table = "<tbody>"; //create HTML table
            //fill HTML table
            for (var i = 0; i < Object.keys(data).length; ++i) {
                table += `<tr><td>${data[i].PatientID}</td>
                              <td>${data[i].FirstName}</td>
                              <td>${data[i].LastName}</td>
                              <td>${data[i].PatientAddress}</td>
                              <td>${data[i].ZipCode}</td></tr>`;
            }
            table += "</tbody>";

            const newTable = document.createElement("tbody");
            newTable.innerHTML = table;

            var resultsTable = document.getElementById("patientInfoTable").lastChild;
            resultsTable.replaceWith(newTable);
        });
}