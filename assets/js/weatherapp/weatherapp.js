const apiKey="6b2ce5cb28e35b71ec9e86bc1f84f317";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    if(response.status == 404) {

    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        let weather = data.weather[0].main.toLowerCase();
        weatherIcon.src = `/assets/images/weatherapp/${weather}.png`;

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

searchButton.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})