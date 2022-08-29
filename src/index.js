//--API--//

function getDataTemp(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    celciusTemperature = response.data.main.temp;
    document.querySelector("#res").innerHTML = Math.round(celciusTemperature);

    document.querySelector("#hum").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    console.log(response);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;

    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
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

//--TEMPERATURE--//

let celtemp = document.querySelector("#cel");
let fahrtemp = document.querySelector("#fahr");
let restemp = document.querySelector("#res");



function showcel(event) {
    restemp.innerHTML = Math.round(celciusTemperature);

}

function showfahr(event) {
    restemp.innerHTML = Math.round((celciusTemperature * 9 / 5) + 32);

}

celtemp.addEventListener("click", showcel);
fahrtemp.addEventListener("click", showfahr);



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




