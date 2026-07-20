# ⛅Weather App

A simple weather application built with HTML, CSS, and JavaScript that lets users search weather by city name or use their current location.

## Features

- Search weather information by city name
- Fetch weather for current location using browser geolocation
- Displays temperature, weather description, city name, wind speed, pressure, and humidity
- Responsive UI for smaller screens

## Files

- `index.html` - App structure and layout
- `style.css` - App styling and responsive layout
- `index.js` - Fetches weather data from the OpenWeatherMap API and updates the UI
- [Live-link](https://cr-weather-app.netlify.app/)

## Setup

1. Open `index.html` in your browser.
2. Enter a city name and click `Search`, or click `Current Location` to use your browser's location.
3. Allow location access if prompted.

## Notes

- This app uses the OpenWeatherMap API.
- The API key is currently stored in `index.js` as `API_key`. Update it if needed.
- The app uses metric units (`°C`).
