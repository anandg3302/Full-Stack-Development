// --- Weather App jQuery Script ---

$(document).ready(function () {
  const citycoords = {
    "mumbai": { lat: 19.076, lon: 72.8777 },
    "london": { lat: 51.5074, lon: -0.1278 },
    "bangalore": { lat: 12.9716, lon: 77.5946 },
    "delhi": { lat: 28.6139, lon: 77.2090 },
    "chennai": { lat: 13.0827, lon: 80.2707 },
    "kolkata": { lat: 22.5726, lon: 88.3639 },
    "hyderabad": { lat: 17.3850, lon: 78.4867 },
    "pune": { lat: 18.5204, lon: 73.8567 },
    "ahmedabad": { lat: 23.0225, lon: 72.5714 }
  };

  $("#weatherForm").on("submit", function (e) {
    e.preventDefault();
    const city = $("#cityInput").val().trim().toLowerCase();
    $("#weather").html("");

    if (!citycoords[city]) {
      $("#weather").html(
        `<div class="error">City not found. Try: Mumbai, London, Bangalore, Delhi, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad.</div>`
      );
      return;
    }

    let coords = citycoords[city];
    $("#weather").html('<div class="loading">Fetching weather...</div>');

    $.ajax({
      url: `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`,
      method: "GET",
      dataType: "json",
      success: function (weatherData) {
        if (!weatherData.current_weather) {
          $("#weather").html('<div class="error">No weather data available.</div>');
          return;
        }

        const w = weatherData.current_weather;
        $("#weather").html(`
          <div class="weather-card">
            <h3>${city.charAt(0).toUpperCase() + city.slice(1)}</h3>
            <p><span class="label">Temperature:</span> <span class="value">${w.temperature}°C</span></p>
            <p><span class="label">Wind Speed:</span> <span class="value">${w.windspeed} km/h</span></p>
            <p><span class="label">Weather Code:</span> <span class="value">${w.weathercode}</span></p>
            <p><span class="label">Time:</span> <span class="value">${w.time.replace('T', ' ')}</span></p>
          </div>
        `);
      },
      error: function (xhr, status, error) {
        $("#weather").html(`<div class="error">Error fetching weather data: ${status}</div>`);
        console.error(error);
      }
    });
  });
});
