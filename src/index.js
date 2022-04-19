function showDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let daysWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysWeek[date.getDay()];

  let currentTime = document.querySelector("#current-location-time");
  currentTime.innerHTML = `${hours}:${minutes}`;
  let currentDayOfTheWeek = document.querySelector(
    "#current-location-day-of-the-week"
  );
  currentDayOfTheWeek.innerHTML = `${day}`;
}
showDate();

function showCurrentLocationAndTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentLocation = response.data.name;
  let tempDisplay = document.querySelector(
    "#current-location-temperature-value"
  );
  let locationDisplay = document.querySelector("#current-location-name");

  tempDisplay.innerHTML = `${currentTemp}`;
  locationDisplay.innerHTML = `${currentLocation}`;
}

function apiCallForTypedLocation(event) {
  event.preventDefault();
  let apiKeyTypedLocation = `a234eb6b12cd6b6e0a5d7aa5d317d874`;
  let tempUnitTypedLocation = `metric`;
  let typedLocation = document.querySelector("#input-location");
  let locationName = typedLocation.value;
  let apiUrlTypedLocation = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKeyTypedLocation}&units=${tempUnitTypedLocation}`;
  axios.get(apiUrlTypedLocation).then(showCurrentLocationAndTemp);
}

function apiCallForCurrentLocation(position) {
  let apiKeyCurrentLocation = `a234eb6b12cd6b6e0a5d7aa5d317d874`;
  let tempUnitCurrentLocation = `metric`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlCurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyCurrentLocation}&units=${tempUnitCurrentLocation}`;
  axios.get(apiUrlCurrentLocation).then(showCurrentLocationAndTemp);
}

function getGeoCoordinates() {
  navigator.geolocation.getCurrentPosition(apiCallForCurrentLocation);
}

let submittedLocation = document.querySelector("#input-search-engine");
submittedLocation.addEventListener("submit", apiCallForTypedLocation);

let currentLocationButton = document.querySelector(
  "#current-data-search-button"
);
currentLocationButton.addEventListener("click", getGeoCoordinates);
