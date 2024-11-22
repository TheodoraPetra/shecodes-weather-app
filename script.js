let apiKey = "064bdaa5f4b41a48e6cta92391004o0f";

function displayTemperature(response) {
  let cityTitle = document.querySelector("#city-title");
  let cityTemperature = document.querySelector("#weather-value");
  let condition = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#weather-icon");
  let iconUrl = response.data.condition.icon_url;
  cityTitle.innerHTML = response.data.city;
  cityTemperature.innerHTML = Math.round(response.data.temperature.current);
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity + " %";
  wind.innerHTML = Math.round(response.data.wind.speed) + " km/h";
  iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather icon" />`;
  getForecastData(response.data.city);
}

function fetchCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-box");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchBox.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#form");
form.addEventListener("submit", fetchCity);

function formatDate() {
  let currentTime = document.querySelector("#current-time");
  let daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let myDate = new Date();
  let dayOfTheWeek = daysOfTheWeek[myDate.getDay()];
  currentTime.innerHTML =
    dayOfTheWeek +
    " " +
    myDate.getHours() +
    ":" +
    String(myDate.getMinutes()).padStart(2, "0");
}
formatDate();

function loadDefaultCity(city) {
  let cityTitle = document.querySelector("#city-title");
  cityTitle.innerHTML = city;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
loadDefaultCity("Paris");

function getForecastData(city) {
  let apiKey = "064bdaa5f4b41a48e6cta92391004o0f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector(".forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<li class="day-section">
     <div class="forecast-day">Tue</div>
     <div class="forecast-icon"><img src=${day.condition.icon_url}></div>
     <div class="forecast-temperature">
       <strong>${Math.round(day.temperature.maximum)}°</strong> ${Math.round(
        day.temperature.minimum
      )}°
     </div>
   </li>`;
  });
  forecast.innerHTML = forecastHtml;
}

getForecastData("Paris");
