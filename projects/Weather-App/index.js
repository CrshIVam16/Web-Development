const API_key = "a020c8b4fab16c5ecce5b73dbb4681e8";

const search = document.getElementById("search")
const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const city = document.getElementById("city")
const secondDiv = document.getElementById("secondDiv")

let response = "", result = "", x = '';

secondDiv.style.display = "none";

btn1.addEventListener("click", () => {
    x = search.value;
    search.value = ""
    if (x) {
        fetch_via_city(x)
        secondDiv.style.display = "none";
    }
})

search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn1.click();
    }
});

async function fetch_via_city(city) {
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
    result = await response.json();
    console.log(result);
    if (result.message) {
        alert(result.message)
        console.error(result.message)
        return;
    }
    secondDiv.style.display = "block";
    displayWeather(result);
}

async function fetch_via_coordinates(latitude, longitude) {
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`);
    result = await response.json();
    console.log(result);
    if (result.message) {
        alert(result.message)
        console.error(result.message)
        return;
    }
    secondDiv.style.display = "block";
    displayWeather(result);
}

async function displayWeather({ name, weather, wind, main }) {
    secondDiv.innerHTML = `
            <div class="top">
                <span id="temp">${main.temp}°C</span>
                <img src='https://openweathermap.org/img/w/${weather[0].icon}.png' alt="">
                <span id="desc">${weather[0].description}</span>
                <span id="city">${name}</span>
            </div>
            <div class="bottom">
                <div class="inner">
                    <span>Wind</span>
                    <span>${wind.speed} m/s</span>
                </div>
                <div class="inner">
                    <span>Pressure</span>
                    <span>${main.pressure} hpa</span>
                </div>
                <div class="inner">
                    <span>Humidity</span>
                    <span>${main.humidity} %</span>
                </div>
            </div>`
}

btn2.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((postion) => {
        let lati = postion.coords.latitude;
        let longi = postion.coords.longitude;
        console.log(lati, longi)
        if (lati && longi) {
            fetch_via_coordinates(lati, longi)
        }
    })
})