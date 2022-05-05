var monthlyValues = Array(12);
var monthNames = Array(12);
var chart;

window.addEventListener("load", function () {
  console.log("Chart - here");
  fetch("https://server.acct-vaxtracker.me/vaxbymonths", {
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
      // console.log(data);

      const size = data.length - 1;
      var month = new Date;

      for (var i = 0; i < size; ++i) {
        monthlyValues[i] = data[i].count;
        // console.log("month: " + i + ", value: " + data[i].count);

        monthNames[i] = month.toLocaleString('en-us', { month: 'short' });
        month.setMonth(month.getMonth() - 1);
      }
    })
    .then(function () {
      chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'light2',
        title: {
          text: 'Vaccinations'
        },
        axisX: {
          includeZero: false,
          title: "Month"
        },
        axisY: {
          includeZero: true
        },
        data: [{
          type: 'line',
          dataPoints: [
            // { label: monthNames[12], y: monthlyValues[12] },
            // { label: monthNames[11], y: monthlyValues[11] },
            { label: monthNames[10], y: monthlyValues[10] },
            { label: monthNames[9], y: monthlyValues[9] },
            { label: monthNames[8], y: monthlyValues[8] },
            { label: monthNames[7], y: monthlyValues[7] },
            { label: monthNames[6], y: monthlyValues[6] },
            { label: monthNames[5], y: monthlyValues[5] },
            { label: monthNames[4], y: monthlyValues[4] },
            { label: monthNames[3], y: monthlyValues[3] },
            { label: monthNames[2], y: monthlyValues[2] },
            { label: monthNames[1], y: monthlyValues[1] },
            // { label: monthNames[0], y: monthlyValues[0] },
          ]
        }
        ]
      })
    })
    .then(function () {
      setTimeout(function () {
        chart.render();
      }, 1000);
    });
});