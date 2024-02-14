//Hämtar bilar och text element.
const car1El = document.getElementById('car1');
const car2El = document.getElementById('car2');
const car1TextEl = document.getElementById('car1Text')
const car2TextEl = document.getElementById('car2Text')

function timeRandom(){
    let time1 = ((0.1 + Math.random() * Math.random()) * 8); //Random tid för bil 1
    let time2 = ((0.1 + Math.random() * Math.random()) * 8); //Random tid för bil 1
    setTime(time1, time2);
}  

function setTime(time1, time2){
    car1El.style.setProperty('--racetime', time1 +'s'); //Uppdaterar --racetime för bil 1
    car2El.style.setProperty('--racetime', time2 +'s'); //Uppdaterar --racetime för bil 2
    car1TextEl.innerHTML += `${Math.floor(time1 * 100) / 100} sekunder`; //Skriver ut tiden för bil 1
    car2TextEl.innerHTML += `${Math.floor(time2 * 100) / 100} sekunder`; //Skriver ut tiden för bil 2
}

timeRandom();