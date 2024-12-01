const apiKey = "9eb289e073eb2a948de604984e746705"; 
function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const weatherInfo = `
        <h2>${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} °C</p>
      `;
      document.getElementById("weatherInfo").innerHTML = weatherInfo;
    })
    .catch(error => {
      document.getElementById("weatherInfo").innerHTML = `Unable to fetch weather data. ${error.message}`;
      console.error("Error fetching weather:", error);
    });
}

// Function to get user's location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(lat, lon);  
      },
      error => {
        // Handle permission 
        if (error.code === error.PERMISSION_DENIED) {
          document.getElementById("weatherInfo").innerHTML = "Location access denied. Please allow location access.";
        } else {
          document.getElementById("weatherInfo").innerHTML = "Unable to get location. Please try again.";
        }
        console.error("Geolocation Error:", error);
      },
      {
        enableHighAccuracy: true,  // Request more accurate location
        timeout: 5000,             // Timeout after 5 seconds
        maximumAge: 0              // Do not use cached location
      }
    );
  } else {
    document.getElementById("weatherInfo").innerHTML = "Geolocation is not supported by this browser.";
  }
}

window.onload = getLocation;
