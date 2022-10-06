let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let minutes = ("0" + now.getMinutes()).slice(-2);

currentDate.innerHTML = `${weekday[now.getDay()]}, ${
  months[now.getMonth()]
} ${date}, ${year}`;

currentTime.innerHTML = `Last updated:  ${now.getHours()}:${minutes}`;

let unit = "imperial";
let searchedCity = document.querySelector("#search");
let apiKey = "2b6fdad0cbd018949c50c70f72250726";
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&units=${unit}&appid=${apiKey}`;

axios.get(weatherApiUrl).then(displayCityAndTemp);

function displayLocalTemp(response) {
  let currentCity = document.querySelector("#searched-city");
  let currentTemp = document.querySelector("#current-display-temp");
  let responseTemp = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let highTempElement = document.querySelector("#temp-high");
  let lowTempElement = document.querySelector("#temp-low");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  currentCity.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${responseTemp}`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCurrentLocation(event) {
  function getCurrentCoords(response) {
    let currentLocationLat = response.coords.latitude;
    let currentLocationLon = response.coords.longitude;
    let unit = "imperial";
    let apiKey = "2b6fdad0cbd018949c50c70f72250726";
    let coordsApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocationLat}&lon=${currentLocationLon}&units=${unit}&appid=${apiKey}`;

    axios.get(coordsApiUrl).then(displayLocalTemp);
  }
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCoords);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forcast-date">${formatDay(forecastDay.dt)}</div>
      <img
      src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      width="40px"
      />
      <div class="weather-forcast-temperatures">
      <span class="weather-forecast-max">${Math.round(
        forecastDay.temp.max
      )}° </span>
      <span class="weather-forecast-min">${Math.round(
        forecastDay.temp.min
      )}°</span>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCityAndTemp(response) {
  let currentCity = document.querySelector("#searched-city");
  let currentTemp = document.querySelector("#current-display-temp");
  let humidityElement = document.querySelector("#humidity");
  let responseTemp = Math.round(response.data.main.temp);
  let windSpeedElement = document.querySelector("#wind-speed");
  let highTempElement = document.querySelector("#temp-high");
  let lowTempElement = document.querySelector("#temp-low");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  currentCity.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${responseTemp}`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

let currentLocationButton = document.querySelector("#current-location-btn");

currentLocationButton.addEventListener("click", searchCurrentLocation);

function searchCity(city) {
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let unit = "imperial";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(weatherApiUrl).then(displayCityAndTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search");
  searchCity(searchedCity.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

  searchCity("Cleveland");