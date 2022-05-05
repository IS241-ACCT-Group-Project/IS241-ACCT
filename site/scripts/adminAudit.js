// var auditLog;

window.addEventListener("load", function () {
    // if (auditLog = document.getElementById("auditLog")) {
    fetch("https://server.acct-vaxtracker.me/auditlog", {
        method: "GET",
        // headers: {
        // "Content-Type": "application/json"
        // }
    })
        .then(function (response) {
            // console.log(response);
            if (response.status >= 400) {
                document.getElementById("auditLog").hidden = true;
                return null;
            }
            else {
                return response.json();
            }
        })
        .then(function (data) {
            // console.log(data);

            if (data[0]) {
                var list = `<li class="collection-header"><h5>Recent Actions</h5></li>`;
                for (var i = 0; i < data.length; ++i) {
                    list += `<li class="collection-item avatar">
                         <span class="title">${data[i].EntryType.toUpperCase()}</span>`;
                    if (data[i].Query != "") {
                        // console.log(data[i].Query);
                        list += `<p class="truncate">${data[i].Query}</p>`;
                    }

                    // const sqlDT = data[i].EntryDate.split(/[- :]/);
                    // const jsDT = new Date(Date.UTC(sqlDT[0], sqlDT[1] - 1, sqlDT[2], sqlDT[3], sqlDT[4], sqlDT[5]));
                    // console.log(Date.now().toLocaleString("en-us", { timeStyle: "short" }));

                    list += `<p class="approve green-text">Account #${data[i].AccountID}</p>
                         <p class="deny red-text">${data[i].EntryDate.toLocaleString()}</p>
                         </li>`;
                }
                list += `</ul>`;

                const newList = document.createElement("ul");
                newList.innerHTML = list;

                var auditLog = document.getElementById("auditLog").lastChild;
                auditLog.replaceWith(newList);
            }
        });
    // }
});