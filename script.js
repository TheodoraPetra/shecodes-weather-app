let apiKey = "064bdaa5f4b41a48e6cta92391004o0f";

function displayTemperature(response) {
  let cityTitle = document.querySelector("#city-title");
  let cityTemperature = document.querySelector("#weather-value");
  let condition = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#weather-icon");
  let iconUrl = response.data.condition.icon_url;
  let cityTime = response.data.time;
  cityTitle.innerHTML = response.data.city;
  cityTemperature.innerHTML = Math.round(response.data.temperature.current);
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity + " %";
  wind.innerHTML = Math.round(response.data.wind.speed) + " km/h";
  iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather icon" />`;
  formatDate(cityTime);
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

function formatDate(cityTimestamp) {
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
  let cityDate = new Date(cityTimestamp * 1000);
  let dayOfTheWeek = daysOfTheWeek[cityDate.getDay()];
  let hours = cityDate.getHours();
  let minutes = String(cityDate.getMinutes()).padStart(2, "0");
  currentTime.innerHTML = `${dayOfTheWeek} ${hours}:${minutes}`;
}

function loadDefaultCity(city) {
  let cityTitle = document.querySelector("#city-title");
  cityTitle.innerHTML = city;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
loadDefaultCity("Paris");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecastData(city) {
  let apiKey = "064bdaa5f4b41a48e6cta92391004o0f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector(".forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<li class="day-section">
     <div class="forecast-day">${formatDay(day.time)}</div>
     <div class="forecast-icon"><img src=${day.condition.icon_url}></div>
     <div class="forecast-temperature">
       <strong>${Math.round(day.temperature.maximum)}°</strong> ${Math.round(
          day.temperature.minimum
        )}°
     </div>
   </li>`;
    }
  });
  forecast.innerHTML = forecastHtml;
}

getForecastData("Paris");
