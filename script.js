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
  return `${day}, ${month} ${date}, ${year} &nbsp; ${hour}:${minutes}`;
  
  function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "c5b46e313ac60a38d46e9623287e0a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
  console.log(apiUrl);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

function showTemp(response) {
  console.log(response.data);
  console.log(response.data.dt);
  let h1 = document.querySelector("h1");
  let cityElement = response.data.name;
  h1.innerHTML = `${cityElement}`;
  let temperature = document.querySelector("#temperature");
  let currentTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${currentTemp}C°`;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let wind = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${currentWind} km/h`;
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let description = document.querySelector("#description");
  let updatedDescription = response.data.weather[0].description;
  description.innerHTML = `${updatedDescription}`;
  let todaysDate = document.querySelector("#date");
  todaysDate.innerHTML = formatDate(response.data.dt * 1000);
}
//Bonus homework

function showCoord(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c5b46e313ac60a38d46e9623287e0a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}
function getPosition(position) {
  navigator.geolocation.getCurrentPosition(showCoord);
}

function displayTemp(response) {
  console.log(response.data);
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let currentPlace = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentPlace}`;
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}%`;
  let wind = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `${currentWind}km/h`;
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let description = document.querySelector("#description");
  let updatedDescription = response.data.weather[0].main;
  description.innerHTML = `${updatedDescription}`;
}

let currentLocation = document.querySelector("#Current-location-button");
currentLocation.addEventListener("click", getPosition);
