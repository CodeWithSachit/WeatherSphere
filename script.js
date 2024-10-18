console.log("script loading..........");

const apiKey = "02f3590b9bd416cbf6c03f1f32e229ad";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function Checkweather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".windy").innerHTML = data.wind.speed + " km/h";

        // Weather Icon Selection
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "pngs/cloudy.png";
                break;
            case "Clear":
                weatherIcon.src = "pngs/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "pngs/rainy.png";
                break;
            case "Drizzle":
                weatherIcon.src = "pngs/drizzle.png"; // fixed typo
                break;
            case "Mist":
            case "Haze":
                weatherIcon.src = "pngs/mist.png";
                break;
            case "Snow":
                weatherIcon.src = "pngs/snow.png";
                break;
            case "Thunderstorm":
                weatherIcon.src = "pngs/thunderstorm.png";
                break;
            case "Fog":
                weatherIcon.src = "pngs/fogy.png";
                break;
            default:
                weatherIcon.src = "pngs/default.png"; // fallback if condition isn't covered
                break;
        }

        document.querySelector('.weather').style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Search Button Event Listener
searchBtn.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        Checkweather(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Enter key support for search
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            Checkweather(city);
        } else {
            alert("Please enter a city name.");
        }
    }
});
