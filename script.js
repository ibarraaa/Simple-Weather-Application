const API_KEY = 'your-api-key'; // Replace with your own API key

// Get necessary DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const forecastEl = document.getElementById('forecast');

// Function to fetch weather data from API
const getWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// Function to display weather data on the UI
const displayWeatherData = (data) => {
  if (data.cod === '404') {
    locationEl.textContent = 'City not found';
    temperatureEl.textContent = '';
    descriptionEl.textContent = '';
    humidityEl.textContent = '';
    forecastEl.innerHTML = '';
  } else {
    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionEl.textContent = data.weather[0].description;
    humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
  }
};

// Function to handle form submission
const handleFormSubmit = async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (city !== '') {
    const weatherData = await getWeatherData(city);
    displayWeatherData(weatherData);
    cityInput.value = '';
  }
};

// Event listener for form submission
searchBtn.addEventListener('click', handleFormSubmit);
