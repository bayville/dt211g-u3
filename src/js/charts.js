import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart');
const url = 'https://studenter.miun.se/~mallar/dt211g/';


async function fetchCourses(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.table(data);
        
    } catch (error){
        console.log('Error:', error);
    }
}

fetchCourses(url);


if(ctx) {
console.log(ctx);
new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
} else {
    console.log('Finns inte');
}



