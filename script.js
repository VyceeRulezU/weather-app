// document.addEventListener("DOMContentLoaded", () => {
//     const apiKey = "9e745bb4bfed37fa943cb2b5f493d34c"; // Replace with your OpenWeatherMap API key
//     const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";

//     const form = document.querySelector("form");
//     const inputCity = document.getElementById("city");

//     const cityTitle = document.querySelector(".city-title p");
//     const cityDescription = document.querySelector(".city-description");
//     const forecast = document.querySelector(".forcast h1");
//     const sectionTitle = document.getElementById("city-date");
//     const locationDescription = document.querySelector(".location-description p");

//     const humidityEl = document.querySelectorAll(".details-card p:nth-child(2)")[0];
//     const windSpeedEl = document.querySelectorAll(".details-card p:nth-child(2)")[1];
//     const windDirectionEl = document.querySelectorAll(".details-card p:nth-child(2)")[2];

//     // Fetch Weather Data
//     async function fetchWeather(city) {
//         try {
//             const response = await fetch(`${weatherApiUrl}?q=${city}&appid=${apiKey}&units=metric`);
//             if (!response.ok) throw new Error("City not found");
//             const data = await response.json();
            
//             updateUI(data);
//         } catch (error) {
//             alert(error.message);
//         }
//     }

//     // Update UI with Weather Data
//     function updateUI(data) {
//         const { name, sys, weather, main, wind } = data;
        
//         // City and Country
//         cityTitle.textContent = name;
//         cityDescription.textContent = `Welcome to ${name}, the capital city of ${sys.country}. It is known for its rich culture and stunning landscapes.`;

//         // Weather Forecast
//         forecast.textContent = weather[0].description.toUpperCase();

//         // Section Title (State + Date & Time)
//         const date = new Date();
//         sectionTitle.textContent = `${name}, ${date.toDateString()} ${date.toLocaleTimeString()}`;

//         // Location Description
//         locationDescription.textContent = `Currently, ${name} is experiencing ${weather[0].description}. The temperature feels like ${main.feels_like}°C with a humidity of ${main.humidity}%.`;

//         // Weather Details
//         humidityEl.textContent = `${main.humidity}%`;
//         windSpeedEl.textContent = `${wind.speed} m/s`;
//         windDirectionEl.textContent = `${wind.deg}°`;
//     }

//     // Form Submission Event
//     form.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const city = inputCity.value.trim();
//         if (city) fetchWeather(city);
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "9e745bb4bfed37fa943cb2b5f493d34c"; // Replace with your OpenWeatherMap API key
    const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";

    const form = document.querySelector("form");
    const inputCity = document.getElementById("city");
    const bodyWrapper = document.querySelector(".body-wrapper");

    const cityTitle = document.querySelector(".city-title p");
    const cityDescription = document.querySelector(".city-description");
    const forecast = document.querySelector(".forcast h1");
    const sectionTitle = document.getElementById("city-date");
    const locationDescription = document.querySelector(".location-description p");

    const humidityEl = document.querySelectorAll(".details-card p:nth-child(2)")[0];
    const windSpeedEl = document.querySelectorAll(".details-card p:nth-child(2)")[1];
    const windDirectionEl = document.querySelectorAll(".details-card p:nth-child(2)")[2];

    // Weather-based background images
    const weatherBackgrounds = {
        Clear: "url('./images/sunny.jpg')",
        Clouds: "url('./images/cloudy.jpg')",
        Rain: "url('./images/rainy.jpg')",
        Thunderstorm: "url('./images/thunderstorm.jpg')",
        Drizzle: "url('./images/drizzle.jpg')",
        Snow: "url('./images/snowy.jpg')",
        Mist: "url('./images/mist.jpg')",
        Fog: "url('./images/fog.jpg')",
        Haze: "url('./images/haze.jpg')",
        Smoke: "url('./images/smoke.jpg')",
        Dust: "url('./images/dust.jpg')",
        Sand: "url('./images/sandstorm.jpg')"
    };

    // Fetch Weather Data using XMLHttpRequest (XHR)
    function fetchWeather(city) {
        const xhr = new XMLHttpRequest();
        const url = `${weatherApiUrl}?q=${city}&appid=${apiKey}&units=metric`;

        xhr.open("GET", url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    updateUI(data);
                } else {
                    alert("City not found. Please try again.");
                }
            }
        };

        xhr.send();
    }

    // Update UI with Weather Data
    function updateUI(data) {
        const { name, sys, weather, main, wind } = data;
        const weatherMain = weather[0].main; // Main weather condition

        // City and Country
        cityTitle.textContent = name;
        cityDescription.textContent = `Welcome to ${name}, the capital city of ${sys.country}. It is known for its rich culture and stunning landscapes.`;

        // Weather Forecast
        forecast.textContent = weather[0].description.toUpperCase();

        // Section Title (State + Date & Time)
        const date = new Date();
        sectionTitle.textContent = `${name}, ${date.toDateString()} ${date.toLocaleTimeString()}`;

        // Location Description
        locationDescription.textContent = `Currently, ${name} is experiencing ${weather[0].description}. The temperature feels like ${main.feels_like}°C with a humidity of ${main.humidity}%.`;

        // Weather Details
        humidityEl.textContent = `${main.humidity}%`;
        windSpeedEl.textContent = `${wind.speed} m/s`;
        windDirectionEl.textContent = `${wind.deg}°`;

        // Change Background Image Based on Weather Condition
        if (weatherBackgrounds[weatherMain]) {
            bodyWrapper.style.backgroundImage = weatherBackgrounds[weatherMain];
        } else {
            bodyWrapper.style.backgroundImage = "url('./images/default.jpg')"; // Fallback image
        }
    }

    // Form Submission Event
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const city = inputCity.value.trim();
        if (city) fetchWeather(city);
    });
});

