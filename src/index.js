//--API--//

let celciusTemperature;
let apiKey = "f2a7bf87b777299f2d3968c89592e347";
let baseUrl = "https://api.openweathermap.org/data/2.5";


function getForecast(coordinates) {
    let apiUrl = `${baseUrl}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    return axios.get(apiUrl).then(displayForecast);
}


function getDataTemp(data) {

    document.querySelector("#current-city").innerHTML = data.name;
    document.querySelector("#current-temperature").innerHTML = Math.round(data.main.temp);

    document.querySelector("#current-humidity").innerHTML = data.main.humidity;
    document.querySelector("#current-wind").innerHTML = Math.round(data.wind.speed);
    document.querySelector("#current-description").innerHTML = data.weather[0].description;

    document.querySelector("#current-icon").setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    document.querySelector("#current-icon").setAttribute("alt", data.weather[0].description);
}

function onCityReceived(response) {
    celciusTemperature = response.data.main.temp;
    getDataTemp(response.data);
    getForecast(response.data.coord);
}

function getData(city) {
    let apiURL = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;

    return axios.get(apiURL).then(onCityReceived);
}


function submit(event) {
    event.preventDefault();
    let cName = document.querySelector("#form-input").value;
    getData(cName);
}


//--TEMPERATURE--//

function showcel() {
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = Math.round(celciusTemperature);
}

function showfahr() {
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = Math.round((celciusTemperature * 9 / 5) + 32);
}

//--CURRENT LOCATION BUTTON--//

function showTempPos(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiURL = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiURL).then(onCityReceived);
}

function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showTempPos);
}


//--DATA AND TIME--//

function formatDay(date) {
    return new Intl.DateTimeFormat([], { weekday: 'long' }).format(date);
}


//--FORECAST--//

function displayForecast(response) {
    let forecast = response.data.daily.slice(0, 5);
    let forecastElement = document.querySelector("#forecast");

    forecastElement.innerHTML = `
   <div class="grid">
   ${forecast.reduce((res, day) => res + `
   <div class="forecast-unit">
   <span class = "forecast-day">${formatDay(new Date(day.dt * 1000))}</span> 
                <br />
                <span class = "forecast-temperature">${Math.round(day.temp.day)}°C</span>
                <br />
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" id="forecast-icon" />
            </div>

       `, '')}
        </div>`;
}


function displayCurrentDate() {
    let now = new Date();

    let projDay = document.querySelector("#current-day");
    projDay.innerHTML = formatDay(now);

    let projTime = document.querySelector("#current-time");
    projTime.innerHTML = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let projDate = document.querySelector("#current-date");
    projDate.innerHTML = now.toLocaleDateString();
}


function addListeners() {
    let form = document.querySelector("form");
    form.addEventListener("submit", submit);

    let celtemp = document.querySelector("#current-celcius");
    celtemp.addEventListener("click", showcel);

    let fahrtemp = document.querySelector("#current-fahrenheit");
    fahrtemp.addEventListener("click", showfahr);

    let locButton = document.querySelector("#form-btn-location");
    locButton.addEventListener("click", getCurrentPosition);
}


function main() {

    addListeners();
    displayCurrentDate();
    navigator.geolocation.getCurrentPosition(showTempPos);
}

main();


