import Chart from 'chart.js/auto'; //Import chart.js

const barChart = document.getElementById('myChart'); //Barchart element
const pieChart = document.getElementById('myPieChart') //Pie Chart element
const url = 'https://studenter.miun.se/~mallar/dt211g/'; //Fetch URL
let fetchData; //variable to save the data from the fetch

//Fetch function
async function fetchCourses(url){ //fetch with url
    try{
        const response = await fetch(url);
        const data = await response.json(); //Response
        fetchData = data; //Update the fetch variable with the responsedata
        sortData(fetchData); //Call the sort function
        return fetchData; //return fetchData.
    } catch (error){
        console.log('Error:', error);
    }
}

//Function to sort all the data before filtering, to aviod multiple sorting rounds
function sortData(data) {
  const sortedData = data.sort((a, b) => (
  parseInt(a.applicantsTotal) < parseInt(b.applicantsTotal) ? 1 : -1  //Sort data on total number of applicants
  ));
  filterData(sortedData); //Call filter function with the sorted data
}

//Function to filter the data on courses and programs
function filterData (data){

  //Filter on courses
  const filteredCourseData = data.filter((course) => {
    return(
        course.admissionRound === 'HT2023' && course.type === 'Kurs'
    )
  });

  //Filter on programs
  const filteredProgramData = data.filter((program) => {
    return(
        program.admissionRound === 'HT2023' && program.type === 'Program'
    )
  });
  
  // Slice the array to only get the first 6 courses and split into
  topSixCoursesName = filteredCourseData.slice(0,6).map(course => course.name); //Put the names into an array
  topSixCoursesData = filteredCourseData.slice(0,6).map(course => parseInt(course.applicantsTotal)); // Put the number of applicants in an array
  renderBarChart(topSixCoursesName, topSixCoursesData, barChart); //Call the render barcharts function

  topSixProgramName = filteredProgramData.slice(0,6).map(program => program.name); //Put the names into an array
  topSixProgramData = filteredProgramData.slice(0,6).map(program => parseInt(program.applicantsTotal)); // Put the number of applicants in an array
  renderPieChart(topSixProgramName, topSixProgramData, pieChart); //Call the render piecharts function
}

//Function to render the bar chart
function renderBarChart(courseName, courseData, element){  //Takes in the arrays and which element to render
  new Chart(element, {
      type: 'bar',
      data: {
        labels: courseName,
        datasets: [{
          label: 'Antal sökande',
          data: courseData,
          borderWidth: 2,
          borderColor: [
            'rgba(0, 63, 92, 1)',
            'rgba(68, 78, 134, 1)',
            'rgba(149, 81, 150, 1)',
            'rgba(221, 81, 130, 1)',
            'rgba(255, 110, 84, 1)',
            'rgba(255, 166, 0, 1)'
          ],
          backgroundColor: [
            'rgba(0, 63, 92, 0.8)',
            'rgba(68, 78, 134, 0.8)',
            'rgba(149, 81, 150, 0.8)',
            'rgba(221, 81, 130, 0.8)',
            'rgba(255, 110, 84, 0.8)',
            'rgba(255, 166, 0, 0.8)'
          ]        
          
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 90, //rotate 90deg
              minRotation: 90, //rotate 90deg
              callback: function(value){
                return this.getLabelForValue(value).substring(0,20) + '...'; //Truncuate text for the ticks
              }
            }
          }
        },
      }
    });
  }


function renderPieChart(courseDataName, courseDataNumber, element){
new Chart(element, {
    type: 'pie',
    data: {
      labels: courseDataName,
      datasets: [{
        label: 'Antal sökande',
        data: courseDataNumber,
        borderWidth: 1,
        borderColor: [
          'rgba(0, 63, 92, 1)',
          'rgba(68, 78, 134, 1)',
          'rgba(149, 81, 150, 1)',
          'rgba(221, 81, 130, 1)',
          'rgba(255, 110, 84, 1)',
          'rgba(255, 166, 0, 1)'
        ],
        backgroundColor: [
          'rgba(0, 63, 92, 0.8)',
          'rgba(68, 78, 134, 0.8)',
          'rgba(149, 81, 150, 0.8)',
          'rgba(221, 81, 130, 0.8)',
          'rgba(255, 110, 84, 0.8)',
          'rgba(255, 166, 0, 0.8)'
        ]        
        
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}


if (barChart &&  pieChart){
fetchCourses(url);
}