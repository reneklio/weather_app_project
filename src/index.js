//--API--//

function getDataTemp(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#res").innerHTML = Math.round(
        response.data.main.temp
    );
    document.querySelector("#hum").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    console.log(response);
}

getData("Kyiv");

function getData(city) {
    let apiKey = "f2a7bf87b777299f2d3968c89592e347";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiURL).then(getDataTemp);
}

function submit(event) {
    event.preventDefault();
    let cName = document.querySelector("#formGroupExampleInput").value;
    getData(cName);
}
let form = document.querySelector("form");
form.addEventListener("submit", submit);

//--CURRENT LOCATION BUTTON--//

function showTempPos(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = `f2a7bf87b777299f2d3968c89592e347`;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiURL).then(getDataTemp);
}

function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showTempPos);
}

let locButton = document.querySelector("#location");
locButton.addEventListener("click", getCurrentPosition);

//--DATA AND TIME--//

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

//--TEMPERATURE--//

let celtemp = document.querySelector("#cel");
let fahrtemp = document.querySelector("#fahr");
let restemp = document.querySelector("#res");

console.log(celtemp);
console.log(fahrtemp);
console.log(restemp);

function showcel(event) {
    restemp.innerHTML = 20;
}

function showfahr(event) {
    restemp.innerHTML = 70;
}

celtemp.addEventListener("click", showcel);
fahrtemp.addEventListener("click", showfahr);
