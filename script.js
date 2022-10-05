function formatDate (date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
  "Sunday",
   "Monday", 
   "Tuesday", 
   "Wednesday", 
   "Thursday", 
   "Friday", 
   "Saturday"
  ];
  let day =  days[dayIndex];
    return `${days[dayIndex]} ${hours}:${minutes}`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }
  
  function displayForecast(response){
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");


function displayForecast();

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
      if (index < 6) {
      forecastHTML = 
      forecastHTML + 
      `
    <div class="col-2">
      <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
      <img 
      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt=""
      width="45"
      />
  <div class="forecast-temperatures">
    <span class="forecast-max">
    ${
      Math.round(forecastDay.temp.max)}°</span> 
   <span class="forecast-min">
   ${
      Math.round(forecastDay.temp.min)}°</span>
   </div>
  </div>
  `;
   }
    })

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }

  function getForecast(coordinates) {
    let apiKey = "2b6fdad0cbd018949c50c70f72250726";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
  }

  function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    document.querySelector("#highTemp").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#lowTemp").innerHTML = Math.round(response.data.main.temp_min);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src", 
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  }

  function search(event) {
  event.preventDefault();
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function searchLocation(position) {
    let apiKey = "2b6fdad0cbd018949c50c70f72250726";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  let searchForm = document.querySelector("#search-form");
  
  searchForm.addEventListener("submit", search);
  
  dateElement.innerHTML = formatDate(currentTime);

  search("Cleveland");