//--API--//

let celciusTemperature;
let baseUrl = "https://api.openweathermap.org/data/2.5";



function getForecast(coordinates) {
    let apiUrl = `${baseUrl}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    return axios.get(apiUrl).then(displayForecast, displayError);
}


function displayCurrentData(data) {

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
    displayCurrentData(response.data);
    getForecast(response.data.coord);
}

function getData(city) {
    let apiURL = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
    return axios.get(apiURL).then(onCityReceived, displayError)

}



function submit(event) {
    let inputName = document.querySelector("#form-input").value;
    event.preventDefault();

    getData(inputName)

}

function displayError(data) {
    let inputName = document.querySelector("#form-input").value;
    if (inputName.length === 0 || inputName != data.name) {
        alert("Please, enter correct city name🙂")
    }
}


//--TEMPERATURE--//

function celsiusConvertion() {
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = Math.round(celciusTemperature);
}

function fahrenheitConvertion() {
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = Math.round((celciusTemperature * 9 / 5) + 32);
}

//--CURRENT LOCATION BUTTON--//

function getCurrentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiURL = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiURL).then(onCityReceived);
}

function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
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
   <div class="container-fluid">
   ${forecast.reduce((res, day) => res + `
      <div class="forecast-unit">
                <div class = "col-sm-auto forecast-day">${formatDay(new Date(day.dt * 1000))}</div> 
                
                <div class = "forecast-temperature">${Math.round(day.temp.day)}°C</div>
                
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" class="img-fluid" id="forecast-icon" />
       </div>

       `, '')}
    </div>`;
}


function displayCurrentDate() {
    let now = new Date();

    let currentDay = document.querySelector("#current-day");
    currentDay.innerHTML = formatDay(now);

    let currentTime = document.querySelector("#current-time");
    currentTime.innerHTML = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let currentDate = document.querySelector("#current-date");
    currentDate.innerHTML = now.toLocaleDateString();
}


function addListeners() {
    let form = document.querySelector("form");
    form.addEventListener("submit", submit);

    let celsiusTemperature = document.querySelector("#current-celsius");
    celsiusTemperature.addEventListener("click", celsiusConvertion);

    let fahrenheitTemperature = document.querySelector("#current-fahrenheit");
    fahrenheitTemperature.addEventListener("click", fahrenheitConvertion);

    let locationButton = document.querySelector("#form-btn-location");
    locationButton.addEventListener("click", getCurrentPosition);
}


function main() {
    addListeners();
    displayCurrentDate();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

main();


