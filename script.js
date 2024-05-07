let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showCity(city);
}

function showCity(city) {
  let apiKey = "303b041t9dc7c1ce08f4ao48696a7fa8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  let h1 = document.querySelector("h1");
  let cityElement = response.data.city;
  cityElement = cityElement.replace("New York County", "New York");
  let countryElement = response.data.country;
  countryElement = countryElement.replace("United States of America", "USA");
  countryElement = countryElement.replace(
    "United Kingdom of Great Britain and Northern Ireland",
    "UK"
  );
  h1.innerHTML = `${cityElement}, ${countryElement}`;
  let temperature = document.querySelector("#temperature");
  fahrenheitTemp = response.data.temperature.current;
  let currentTemp = Math.round(fahrenheitTemp);
  temperature.innerHTML = `${currentTemp}°F`;
  let currentHumidity = response.data.temperature.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let wind = document.querySelector("#wind");
  windImperial = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windImperial} m/ph`;
  let feelsLike = document.querySelector("#feelsLike");
  feelsLikeFahr = Math.round(response.data.temperature.feels_like);
  feelsLike.innerHTML = `${feelsLikeFahr}°F`;
  let description = document.querySelector("#description");
  let updatedDescription = response.data.condition.description;
  description.innerHTML = `${updatedDescription}`;
  let todaysDate = document.querySelector("#date");
  todaysDate.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates, response.data.city);
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
  hour = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `Last updated: ${day}, ${month} ${date}, ${year}  at ${hour}`;
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

function getForecast(coordinates, city) {
  let apiKey = "303b041t9dc7c1ce08f4ao48696a7fa8";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
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
 
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col days">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
  
      <img
        src= ${forecastDay.condition.icon_url}
         
       
        alt=${forecastDay.condition.icon}
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temperature.minimum
        )}°- </span>
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
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

showCity("New York");

//Bonus homework- get weather by geo location
let currentLocation = document.querySelector("#Current-location-button");
currentLocation.addEventListener("click", getPosition);

function getPosition(position) {
  navigator.geolocation.getCurrentPosition(showCoord);
  console.log(position);
}
function showCoord(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "303b041t9dc7c1ce08f4ao48696a7fa8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
