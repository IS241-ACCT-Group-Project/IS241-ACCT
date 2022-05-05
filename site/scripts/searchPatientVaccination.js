var form;

window.addEventListener("load", function () {
    form = document.getElementById("patientVaccinationSearch");
    form.addEventListener("submit", searchPatientVaccination);
});

function searchPatientVaccination(event) {
    event.preventDefault();

    // console.log(JSON.stringify(form));

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    // console.log(value);

    fetch("https://server.acct-vaxtracker.me/searchPatientVaccination", {
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
                              <td>${data[i].VaccinationDate.substring(0, 10)}</td>
                              <td>${data[i].InjectorID}</td>
                              <td>${data[i].FirstName}</td>
                              <td>${data[i].LastName}</td>
                              <td>${data[i].VaccinationType}</td>
                              <td>${data[i].LotNumber}</td></tr>`;
            }
            table += "</tbody>";

            const newTable = document.createElement("tbody");
            newTable.innerHTML = table;

            var resultsTable = document.getElementById("patientVaccinationTable").lastChild;
            resultsTable.replaceWith(newTable);
        });
}