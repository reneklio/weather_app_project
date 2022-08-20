let now = new Date();
console.log(now.getHours());
console.log(now.getMinutes());
console.log(now.getDay());
console.log(now.getDate());
console.log(now.getMonth());
console.log(now.getFullYear());

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let todDay = days[now.getDay()];

let projDay = document.querySelector("#currDay");
projDay.innerHTML = todDay;

let todMin = now.getMinutes();
let todHours = now.getHours();

if (todHours < 10) {
    todHours = `0${todHours}`;
}

if (todMin < 10) {
    todMin = `0${todMin}`;
}

let projTime = document.querySelector("#currTime");
projTime.innerHTML = `${todHours}:${todMin}`;
console.log(projTime);

let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let todMonth = months[now.getMonth()];

let currDay = now.getDate();
let currYear = now.getFullYear();

let projDate = document.querySelector("#currDate");
projDate.innerHTML = `${todMonth}/${currDay}/${currYear}`;












function showInfo(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#res").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#hum").innerHTML = `Humidity: ${Math.round(
        response.data.main.humidity
    )}%`;
    document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;


    let currTemp = Math.round(response.data.main.temp);

    let place = document.querySelector("#res");
    place.innerHTML = currTemp;
    axios.get(apiURL).then(getInfo);
    console.log(response.data);
}

function showDefaultInfo(city) {

    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=${city},au&appid=${apiKey}&units=metric";
    let apiKey = "7e7a6afccc2b04cbebfc65ac42faa6dc";
    axios.get(apiURL).then(showInfo);
}


function submit(event) {
    event.preventDefault();
    let inp = document.querySelector("#formGroupExampleInput");
    let result = document.querySelector("#city");
    result.innerHTML = inp.value;
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=${city},au&appid=${apiKey}&units=metric";
    let apiKey = "7e7a6afccc2b04cbebfc65ac42faa6dc";
    axios.get(apiURL).then(showTemp);
}


let search = document.querySelector("#srch");
search.addEventListener("click", submit);
