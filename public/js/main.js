//Select DOM items

const menuBtn=document.querySelector('.menu-btn');
const menu=document.querySelector('.menu');
const menuNav=document.querySelector('.menu-nav');
const navItmes=document.querySelectorAll('.nav-item');

//Set initial state of menu
let showMenu=false;

menuBtn.addEventListener('click',toggleMenu)

function toggleMenu(){
    if(!showMenu){
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        navItmes.forEach(item=>item.classList.add('show'));
        menuBtn.classList.add('active');
        //Set Menu state
        showMenu=true;
    }else{
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        navItmes.forEach(item=>item.classList.remove('show'));
        menuBtn.classList.remove('active');
        //Set Menu state
        showMenu=false;
    }
}


var data = {
    labels: ["Jan", "Feb", "March", "Apr", "May", "June"],
    datasets: [
        {
            label: 'Germination %',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: ['#587ce4'],
            borderWidth: 2,
            fill: false
        },
        {
            label: 'Survival Rate',
            data: [5, 23, 7, 12, 42, 23],
            borderColor: [
            '#ede190'
            ],
            borderWidth: 2,
            fill: false
        },
        {
            label: 'Total Trees',
            data: [15, 10, 21, 32, 12, 33],
            borderColor: [
            '#f44252'
            ],
            borderWidth: 2,
            fill: false
        }
    ]
};

var groupData = {
    labels: ["Jan", "Feb", "March", "Apr", "May", "June"],
    datasets: [
        {
            label: 'Germination %',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "#587ce4",
            hoverBackgroundColor: "#2e59d9",
            borderColor: "#4e73df",
            borderWidth: 2,
            fill: false
        },
        {
            label: 'Survival Rate',
            data: [5, 23, 7, 12, 42, 23],
            backgroundColor: "#ede190",
            hoverBackgroundColor: "#ede190",
            borderColor: "#ede190",
            borderWidth: 2,
            fill: false
        },
        {
            label: 'Total Trees',
            data: [15, 10, 21, 32, 12, 33],
            backgroundColor: "#009879",
            hoverBackgroundColor: "#009879",
            borderColor: "#009879",
            borderWidth: 2,
            fill: false
        }
    ]
};

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
    radius: 0
    }
}

};


if ($("#lineChart").length) {
    var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas, {
      type: 'line',
      data: data,
      options: options
    });
  }

  if ($("#barChart").length) {
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    var barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: groupData,
      options: options
    });
  }
