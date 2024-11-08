let apiKey = "064bdaa5f4b41a48e6cta92391004o0f";

function displayTemperature(response) {
  let cityTemperature = document.querySelector("#city-temperature");
  cityTemperature.innerHTML = Math.round(response.data.temperature.current);
}

function changeCity(event) {
  event.preventDefault();
  let cityTitle = document.querySelector("#city-title");
  let searchBox = document.querySelector("#search-box");
  cityTitle.innerHTML = searchBox.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchBox.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);

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
