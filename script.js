let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "c5b46e313ac60a38d46e9623287e0a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
  console.log(apiUrl);
}
function showTemp(response) {
  let h1 = document.querySelector("h1");
  let cityElement = response.data.name;
  h1.innerHTML = `${cityElement}`;
  let temperature = document.querySelector("#temperature");
  fahrenheitTemp = response.data.main.temp;
  let currentTemp = Math.round(fahrenheitTemp);
  temperature.innerHTML = `${currentTemp}°F`;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let wind = document.querySelector("#wind");
  windImperial = Math.round(response.data.wind.speed * 0.62);
  wind.innerHTML = `${windImperial} m/ph`;
  let feelsLike = document.querySelector("#feelsLike");
  feelsLikeFahr = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `${feelsLikeFahr}°F`;
  let description = document.querySelector("#description");
  let updatedDescription = response.data.weather[0].description;
  description.innerHTML = `${updatedDescription}`;
  let todaysDate = document.querySelector("#date");
  todaysDate.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(response.data);
  getForecast(response.data.coord);
}

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
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
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Last updated: ${day}, ${month} ${date}, ${year} &nbsp; ${hour}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c5b46e313ac60a38d46e9623287e0a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = (fahrenheitTemp - 32) / 1.8;
  let currentCelsiusTemp = Math.round(celsiusTemp);
  temperatureElement.innerHTML = `${currentCelsiusTemp}°C`;
  let windElement = document.querySelector("#wind");
  let windMetric = windImperial * 1.609;
  windMetric = Math.round(windImperial * 1.609);
  windElement.innerHTML = `${windMetric}km/h`;
  let feelsLikeElement = document.querySelector("#feelsLike");
  let feelsLikeCelsius = (feelsLikeFahr - 32) / 1.8;
  feelsLikeCelsius = Math.round(feelsLikeCelsius);
  feelsLikeElement.innerHTML = `${feelsLikeCelsius}°C`;
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let currentTemp = Math.round(fahrenheitTemp);
  temperatureElement.innerHTML = `${currentTemp}°F`;
  let windElement = document.querySelector("#wind");
  let currentWind = Math.round(windImperial);
  windElement.innerHTML = `${currentWind} m/ph`;
  let feelsLike = document.querySelector("#feelsLike");
  let currentFeelsLike = Math.round(feelsLikeFahr);
  feelsLike.innerHTML = `${currentFeelsLike}°F`;
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let fahrenheitTemp = null;
let windImperial = null;
let feelsLikeFahr = null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//Bonus homework

let currentLocation = document.querySelector("#Current-location-button");
currentLocation.addEventListener("click", getPosition);

function getPosition(position) {
  navigator.geolocation.getCurrentPosition(showCoord);
}
function showCoord(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c5b46e313ac60a38d46e9623287e0a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}
function displayTemp(response) {
  let temperature = document.querySelector("#temperature");
  let currentTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${currentTemp}°F`;
  let currentPlace = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentPlace}`;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let wind = document.querySelector("#wind");
  let currentWind = Math.round(response.data.main.wind * 0.62);
  wind.innerHTML = `${currentWind} m/ph`;
  let feelsLike = document.querySelector("#feelsLike");
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `${currentFeelsLike}°F`;
  let description = document.querySelector("#description");
  let updatedDescription = response.data.weather[0].description;
  description.innerHTML = `${updatedDescription}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
