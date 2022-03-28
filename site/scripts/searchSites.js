var form;

window.addEventListener("load", function () {
    form = document.getElementById("siteSearch");
    form.addEventListener("submit", searchSites);
});

function searchSites(event) {
    event.preventDefault();

    //console.log(JSON.stringify(form));

    //from https://www.learnwithjason.dev/blog/get-form-values-as-json
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    //console.log(value);

    fetch("http://localhost:8081/searchsites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        })
        .then(function (response) {
            //console.log(response);
            return response.json();
        })
        .then(function(data) {
            //console.log(data);

            var table = "<tbody>"; //create HTML table
            //fill HTML table
            for (var i = 0; i < Object.keys(data).length; ++i) {
                table += `<tr><td>${data[i].SiteID}</td>
                              <td>${data[i].SiteName}</td>
                              <td>${data[i].SiteAddress}</td>
                              <td>${data[i].SiteZipCode}</td>
                              <td>${data[i].SitePhoneNumber}</td></tr>`;
            }
            table += "</tbody>";
            
            const newTable = document.createElement("tbody");
            newTable.innerHTML = table;
            
            var resultsTable = document.getElementById("sitesTable").lastChild;
            resultsTable.replaceWith(newTable);
        });
}