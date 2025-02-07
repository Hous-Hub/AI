const apiKey = 'b46310d958216948fd69bba908110581';

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (!city.trim()) {
        alert('Wpisz nazwę miasta!');
        return;
    }
    fetchCurrentWeather(city); // Zapytanie do API Current Weather za pomocą XMLHttpRequest
    fetchWeatherForecast(city); // Zapytanie do API 5-Day Forecast za pomocą Fetch API
});

// Zapytanie do API Current Weather za pomocą XMLHttpRequest
function fetchCurrentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log('Odpowiedź z API Current Weather:', data); // Logowanie odpowiedzi w konsoli
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById('currentWeatherIcon').src = iconUrl;
            document.getElementById('currentWeatherIcon').alt = data.weather[0].description;
            document.getElementById('currentWeatherText').innerHTML = `
                <strong>${data.name}</strong>: ${data.main.temp}°C
            `;
        } else {
            console.error('Błąd pobierania aktualnej pogody:', xhr.statusText);
            document.getElementById('currentWeatherText').textContent =
                'Nie udało się pobrać aktualnej pogody.';
        }
    };

    xhr.onerror = function () {
        console.error('Błąd połączenia z API Current Weather');
        document.getElementById('currentWeatherText').textContent =
            'Błąd połączenia z API.';
    };

    xhr.send();
}

// Zapytanie do API 5-Day Forecast za pomocą Fetch API
function fetchWeatherForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Nie udało się pobrać prognozy pogody.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Odpowiedź z API 5-Day Forecast:', data); // Logowanie odpowiedzi w konsoli
            const forecastDetails = document.getElementById('forecastDetails');
            forecastDetails.innerHTML = '';

            const forecasts = data.list.filter((_, index) => index % 8 === 0);
            forecasts.forEach(item => {
                const forecastDiv = document.createElement('div');
                forecastDiv.innerHTML = `
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="${item.weather[0].description}">
                    <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
                    <p>${item.main.temp}°C</p>
                `;
                forecastDetails.appendChild(forecastDiv);
            });
        })
        .catch(error => {
            console.error('Błąd pobierania prognozy pogody:', error);
            document.getElementById('forecastDetails').textContent =
                'Nie udało się pobrać prognozy.';
        });
}