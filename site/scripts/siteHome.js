var siteName, siteInfo, editSite;
var siteExists = false;

window.addEventListener("load", function () {
    if ((siteName = document.getElementById("siteName"))
        && (siteInfo = document.getElementById("siteInfo"))) {
        editSite = document.getElementById("editSite");

        findSiteInfo();
    }
});

function findSiteInfo() {
    // console.log("test");
    fetch("https://server.acct-vaxtracker.me/siteexists", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data != null) {
                const formattedPhone = `${data.SitePhoneNumber.slice(0, 3)}-${data.SitePhoneNumber.slice(3, 6)}-${data.SitePhoneNumber.slice(6)}`;

                siteName.innerHTML = `${data.SiteName} <i>ID ${data.SiteID}<i>`;
                siteInfo.innerHTML = `${data.SiteAddress} ${data.SiteZipCode}\n${formattedPhone}`;

                editSite.innerHTML = "Edit Account Information";

                siteExists = true;
            }
        });
}

function goSiteInfo(event) {
    event.preventDefault();
    if (siteExists) {
        window.location.href = "https://server.acct-vaxtracker.me/editaccount";
    }
    else {
        window.location.href = "https://server.acct-vaxtracker.me/addsiteinfo";
    }
}