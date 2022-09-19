//--API--//
let apiKey = "f2a7bf87b777299f2d3968c89592e347";


getData("Kyiv");

function getData(city) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiURL).then(getDataTemp);
}


function getDataTemp(response) {

    document.querySelector("#city").innerHTML = response.data.name;
    celciusTemperature = response.data.main.temp;
    document.querySelector("#res").innerHTML = Math.round(celciusTemperature);

    document.querySelector("#hum").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

    document.querySelector("#description").innerHTML = response.data.weather[0].description;

    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}



function getForecast(coordinates) {

    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
}


//-- FORECAST --//

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="grid">`;



    forecast.forEach(function (forecastDay, index) {

        if (index < 5) {
            forecastHTML = forecastHTML +
                ` <div class="day">
                <span class = "forecastDay">${formatDay(forecastDay.dt)}</span> 
                <br />
                <span class = "forecastTemperature">${Math.round(forecastDay.temp.day)}°C</span>
                <br />
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" id="forecast-icon" />
            </div>`;
        }
    })

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

//-- SUBMIT AND CURRENT LOCATION --//


function submit(event) {
    event.preventDefault();
    let cName = document.querySelector("#form-input").value;
    getData(cName);
}
let form = document.querySelector("form");
form.addEventListener("submit", submit);



//--CURRENT LOCATION BUTTON--//

function showTempPos(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
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

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[now.getDay()];



let projDay = document.querySelector("#currDay");
projDay.innerHTML = day;

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


let todMonth = now.getMonth() + 1;

let currDay = now.getDate();
let currYear = now.getFullYear();

let projDate = document.querySelector("#currDate");
projDate.innerHTML = `${todMonth}/${currDay}/${currYear}`;

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();

    return days[day];
}



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