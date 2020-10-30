// Proxy needed as unable to request data from weather API from localhost
const proxy = "https://cors-anywhere.herokuapp.com/";
const apiKey = "bcf5adc4445cab1a41fc173b8717108d";

// DOM selectors
const locationBtn = document.getElementById("get-location-btn");

function fetchWeather(lat, lon) {
    const apiUrl = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(apiUrl)
        .then(resp => resp.json())
        .then(data => console.log(data))
    .catch(err => console.log("Error", err));
}

// Show and store coordinates in variables
function currentCoords(pos) {
    let { latitude, longitude } = pos.coords;
    const lat = latitude;
    const lon = longitude;
    // Fetch weather data with the defined coordinates
    fetchWeather(lat, lon);
}

function getCurrentLocation() {
    // Put the current location in a variable and push it to the getCoords function
    let position = navigator.geolocation.getCurrentPosition(currentCoords);
}

// Event listeners
locationBtn.addEventListener("click", getCurrentLocation);
