var totalsites, totalinjectors, totalvax, monthvax;

if (totalsites = document.getElementById("totalSites")) {
    fetch("https://server.acct-vaxtracker.me/totalsites", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data.count);
            totalsites.innerHTML = data.count;
        });
}

if (totalinjectors = document.getElementById("totalInjectors")) {
    fetch("https://server.acct-vaxtracker.me/totalinjectors", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data.count);
            totalinjectors.innerHTML = data.count;
        });
}

if (totalvax = document.getElementById("totalVaccinations")) {
    fetch("https://server.acct-vaxtracker.me/totalvax", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data.count);
            totalvax.innerHTML = data.count;
        });
}

if (monthvax = document.getElementById("monthVaccinations")) {
    fetch("https://server.acct-vaxtracker.me/monthvax", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data.count);
            monthvax.innerHTML = data.count;
        });
}