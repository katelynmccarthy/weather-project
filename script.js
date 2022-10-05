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
  
  function displayForecast(){
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
    days.forEach(function(day) {
      forecastHTML =  forecastHTML + 
      `
    <div class="col-2">
      <div class="forecast-date">${day}</div>
      <img 
      src="http://openweathermap.org/img/wn/01d@2x.png"
      alt=""
      width="45"
      />
  <div class="forecast-temperatures">
    <span class="forecast-max">
    72°</span> 
   <span class="forecast-min">
   50°</span>
   </div>
  </div>
  `;
    })

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }

  function displayWeatherCondition(response) {
    console.log(response.data);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    document.querySelector("#highTemp").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#lowTemp").innerHTML = Math.round(response.data.main.temp_min);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    temperatureElement.innerHTML = Math.round((temperature - 32) * 5/9);
  }
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round((temperature * 9/5) + 32);
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  let searchForm = document.querySelector("#search-form");
  
  searchForm.addEventListener("submit", search);
  
  dateElement.innerHTML = formatDate(currentTime);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius );
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit );
  
  displayForecast();

  let currentLocationButton = document.querySelector
  ("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);