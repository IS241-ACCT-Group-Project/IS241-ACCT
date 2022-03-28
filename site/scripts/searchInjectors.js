var form;

window.addEventListener("load", function () {
    form = document.getElementById("injectorSearch");
    form.addEventListener("submit", searchInjectors);
});

function searchInjectors(event) {
    event.preventDefault();

    //console.log(JSON.stringify(form));

    //from https://www.learnwithjason.dev/blog/get-form-values-as-json
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    //console.log(value);

    fetch("http://localhost:8081/searchinjectors", {
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
                table += `<tr><td>${data[i].InjectorID}</td>
                              <td>${data[i].FirstName}</td>
                              <td>${data[i].LastName}</td>
                              <td>${data[i].SiteID}</td></tr>`;
            }
            table += "</tbody>";
            
            const newTable = document.createElement("tbody");
            newTable.innerHTML = table;
            
            var resultsTable = document.getElementById("injectorsTable").lastChild;
            resultsTable.replaceWith(newTable);
        });
}