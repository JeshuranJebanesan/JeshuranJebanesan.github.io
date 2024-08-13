const apiKey="6b2ce5cb28e35b71ec9e86bc1f84f317";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=germany";

async function checkWeather(){
    const response = await fetch('${apiUrl}&appid=${apiKey}');
    var data = await response.json();

    console.log(data);
}

checkWeather();