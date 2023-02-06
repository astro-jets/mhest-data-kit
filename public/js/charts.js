// Pie Chart Example


function makeChart(myData)
{
    // Options for line graph and grouped bar graph
    var options = {
    scales: {
        yAxes: [{
        ticks: {
            beginAtZero: true
        }
        }]
    },
    legend: {
        display: true
    },
    elements: {
        point: {
            radius: 1
        }
    }

    };
    // Options end

    //Single Line Graph
    var lineGraphData = {
        labels: ["Jan", "Feb", "March", "Apr", "May", "June"],
        datasets: [
            {
                label: 'Germination %',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: ['#587ce4'],
                borderWidth: 1,
                fill: false
            },
            {
                label: 'Survival Rate',
                data: [5, 23, 7, 12, 42, 23],
                borderColor: [
                '#ede190'
                ],
                borderWidth: 1,
                fill: false
            },
            {
                label: 'Total Trees',
                data: [15, 10, 21, 32, 12, 33],
                borderColor: [
                '#f44252'
                ],
                borderWidth: 1,
                fill: false
            }
        ]
    };
    if ($("#lineChart").length) {
    var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas, {
      type: 'line',
      data: lineGraphData,
      options: options
    });
    }
    //Line graph end

    // Group BarGraph
    var groupData = {
        labels: ["Jan", "Feb", "March", "Apr", "May", "June"],
        datasets: [
            {
                label: 'Mwambo',
                data: myData.ta_data.mwambo,
                backgroundColor: "#587ce4",
                hoverBackgroundColor: "#2e59d9",
                borderColor: "rgb(0, 81, 255)",
                borderWidth: 1,
                fill: false
            },
            {
                label: 'Nkapita',
                data: myData.ta_data.nkapita,
                backgroundColor: "#009879",
                hoverBackgroundColor: "#009879",
                borderColor: "rgb(90, 250, 90)",
                borderWidth: 1,
                fill: false
            },
            {
                label: 'Mlumbe',
                data: myData.ta_data.mlumbe,
                backgroundColor: "#ede190",
                hoverBackgroundColor: "#ede190",
                borderColor: "#9c8805",
                borderWidth: 1,
                fill: false
            }
            ,
            {
                label: 'malemia',
                data: myData.ta_data.malemia,
                backgroundColor: "rgb(138, 219, 17)",
                hoverBackgroundColor: "rgb(138, 219, 17)",
                borderColor: "rgb(0, 128, 0)",
                borderWidth: 1,
                fill: false
            }
        ]
    };
    if ($("#barChart").length) {
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    var barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: groupData,
      options: options
    });
    }
    // Grouped bar graph end

    // Pie chart
    if ($("#myPieChart").length) {
        var ctx = document.getElementById("myPieChart");
        var myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Germination", "Survival", "Motarity"],
                datasets: [{
                data: [myData.pie_data.germination,myData.pie_data.survival,myData.pie_data.motarity],
                backgroundColor: ['rgb(25, 214, 19)','rgb(255, 153, 0)', 'rgb(224, 20, 5)'],
                hoverBackgroundColor: ['rgba(25, 214, 19, 0.8)','rgba(255, 153, 0, 0.8)', 'rgba(224, 20, 5, 0.8)'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: true,
                caretPadding: 10,
                },
                legend: {
                display: false
                },
                cutoutPercentage: 80,
            },
        });
    }
    // Pie chart end

}


function getData() {
    let http = new XMLHttpRequest()
    http.open('get','js/data.json',true)
    http.send()
    http.onload = function(){
        if(this.readyState == 4 && this.status ==200)
        {
            let myData = JSON.parse(this.responseText)
            makeChart(myData)
        }
    }
}


getData()