// DOM selectors
const locationBtn = document.getElementById("get-location-btn");
const weatherImage = document.querySelector(".weather-image-container");
const weatherContents = document.querySelectorAll(".weather-data");

// Proxy needed as unable to request data from weather API from localhost
const proxy = "https://cors-anywhere.herokuapp.com/";
const apiKey = "bcf5adc4445cab1a41fc173b8717108d";

function fetchWeather(lat, lon) {
    const apiUrl = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(apiUrl)
        .then(resp => resp.json())
        // Send the data to the append function
        .then(data => appendData(data))
    .catch(err => console.log("Error", err));
}

// Append the weather data into the DOM
function appendData(data) {
    const { feels_like, humidity, pressure, temp } = data.main;
    const { description } = data.weather[0];
    const { country } = data.sys;
    // Round the temperature to 1 decimal point
    const tempResult = Math.round(temp * 10) / 10;
    // Append data to HTML DOM
    weatherContents[0].textContent = `${country} has ${description}`;
    weatherContents[1].textContent = `It is ${tempResult}`;
    weatherContents[2].textContent = `The temperature outside feels like ${feels_like}. The humidity is ${humidity}% and the pressure is ${pressure} hPa`;
}

// Show and store coordinates in variables
function currentCoords(pos) {
    let { latitude, longitude } = pos.coords;
    const lat = latitude;
    const lon = longitude;
    if (pos.coords) {
        // Fetch weather data with the defined coordinates
        fetchWeather(lat, lon);
    } else {
        console.log("Error getting location");
    }
}

function getCurrentLocation() {
    // Put the current location in a variable and push it to the getCoords function
    const position = navigator.geolocation.getCurrentPosition(currentCoords);
}

// Event listeners
locationBtn.addEventListener("click", getCurrentLocation);
