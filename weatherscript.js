document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getweatherbtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");
  const location = document.getElementById("location")

  const API_KEY = "0091a5eb6a5a47f741935a7b4276cedc"; //env variables

  getweatherbtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    //show some error
    //will take time to fetch data

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //fetch data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City not found");
      
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    //display
    console.log(data);
    const { name, main, weather,coord } = data;
    cityNameDisplay.textContent = name;

    //unclock display

    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
    tempDisplay.textContent = `Temprature : ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
    location.textContent = `Location: Lon: ${coord.lon} Lat: ${coord.lat}`
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
