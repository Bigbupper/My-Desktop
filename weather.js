document.addEventListener('DOMContentLoaded', async function () {
    const apiKey = 'cafd8b9889d4a8fd85d92d260c41985c';
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

    const citySearch = document.querySelector('.city-search input');
    const citySearchBtn = document.querySelector('.city-search button');
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherBase = document.querySelector('#weather-window');
    const miniWeatherIconImg = document.querySelector('#mini-weather-icon img');
    const miniWeatherIcon = document.querySelector('#mini-weather-icon');

    async function getWeather(city) {
        try {
            const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('Network not responding ' + response.statusText);
            }
            data = await response.json();
            updateWeatherUI(data);
            return data;

        } catch (error) {
            console.error('Fetch error: ', error);
            alert('Oops! Something went wrong. Please check spelling or try again later.\nSearch only accepts city, state, or country names.');
            return {};
        }
    }
    function updateWeatherUI(data) {
        if (!data || !data.weather) {
            console.warn("No weather data available");
            return;
        }

        console.log(data);

        updateMainDisplay(data);
        updateMiniDisplay(data);
        updateWeatherIcons(data);
    }

    function updateMainDisplay(data) {
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°F';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' mph';
        document.querySelector('.weather-description').innerHTML = 'Current weather feels like ' + Math.round(data.main.feels_like) + '°F' + ' with ' + data.weather[0].description + '.';
    }

    function updateMiniDisplay(data) {
        document.getElementById('mini-city').innerHTML = data.name;
        document.getElementById('mini-temp').innerHTML = Math.round(data.main.temp) + '°F';
    }

    function updateWeatherIcons(data) {
        const lightClouds = ['few clouds', 'scattered clouds'];
        const heavyClouds = ['overcast clouds', 'broken clouds'];
        const drizzle = ['light intensity drizzle', 'light intensity drizzle rain', 'drizzle', 'heavy intensity drizzle', 'shower drizzle', 'drizzle rain'];
        const lightRain = ['light rain', 'light intensity shower rain', 'shower rain and drizzle', 'shower rain', 'heavy shower rain and drizzle'];
        const heavyRain = ['moderate rain', 'heavy intensity rain', 'very heavy rain', 'extreme rain', 'ragged shower rain'];

        if (heavyClouds.includes(data.weather[0].description)) {
            setWeatherIcons('overcast');
        } else if (lightClouds.includes(data.weather[0].description)) {
            setWeatherIcons('light-clouds');
        } else if (drizzle.includes(data.weather[0].description)) {
            setWeatherIcons('drizzle');
        } else if (lightRain.includes(data.weather[0].description)) {
            setWeatherIcons('light-rain');
        } else if (heavyRain.includes(data.weather[0].description)) {
            setWeatherIcons('heavy-rain');
        } else if (data.weather[0].main === 'Thunderstorm') {
            setWeatherIcons('thunderstorm');
        } else if (data.weather[0].main === 'Snow') {
            setWeatherIcons('snow');
        } else if (data.weather[0].main === 'Mist') {
            setWeatherIcons('mist');
        } else if (data.weather[0].main === 'Clear') {
            setWeatherIcons('clear');
        }
    }

    function setWeatherIcons(condition) {
        weatherIcon.src = `media/weather/${condition}.svg`;
        weatherBase.style.backgroundImage = `url(media/weather/bg-${condition}.jpg)`;
        miniWeatherIconImg.src = `media/weather/${condition}.svg`;
        miniWeatherIcon.style.backgroundImage = `url(media/weather/bg-${condition}.jpg)`;
    }

    citySearchBtn.addEventListener('click', async function () {
        const city = citySearch.value.trim();
        if (city) {
            await getWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    });

    citySearch.addEventListener('keydown', handleCitySearchKeydown);

    async function handleCitySearchKeydown(event) {
        if (event.key === 'Enter') {
            const city = citySearch.value.trim();
            if (city) {
                await getWeather(city);
            } else {
                alert('Please enter a city name.');
            }
        }
    }

    // weather for New York by default
    await getWeather('New York');
});
