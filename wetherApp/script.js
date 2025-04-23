let submitButton = document.getElementById('search');

submitButton.addEventListener('click', function () {
  getWeather(); // ← this was missing
  setTimeout(() => {
    document.getElementById('cityInput').value = '';
  }, 1500)
});

async function getWeather() {
  const city = cityInput.value.trim();
  const apiKey = 'd294485a84b5d6dc0103ee24ae0874cb';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.cod === 200) {
      document.getElementById('temp').innerHTML = data.main.temp.toFixed(1);
      document.getElementById('city').innerHTML = data.name;
      document.getElementById('humidity').innerHTML = data.main.humidity + '%';
      document.getElementById('wind').innerHTML = data.wind.speed + ' km/h';

      let icon = document.querySelector('.weather-icon');
      
      if (data.weather[0].main === 'Clear') {
        icon.src = '/imges/clear.png'
      }
      if (data.weather[0].main === 'Rain') {
        icon.src = '/imges/Rain.png'
      }
      if (data.weather[0].main === 'Drizzle') {
        icon.src = '/imges/drizzele.png'
      }
      if (data.weather[0].main === 'Mist') {
        icon.src = '/imges/mist.png'
      }
    } else {
      document.getElementById('weatherResult').innerHTML = `<p class="text-red-500">City not found</p>`;
    }
  } catch (error) {
    document.getElementById('weatherResult').innerHTML = `<p class="text-red-500">Error fetching data</p>`;
  }
}