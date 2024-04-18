async function getWeather() {
    const apiKey = '12b1eb481bae9424d0d8f352708b1f64';
    const currentCity = document.getElementById("town");
    const currentTemp = document.getElementById("degree");
    const currentTempMax = document.getElementById("tempMax");
    const currentTempMin = document.getElementById("tempMin");
    const currentHumidity = document.getElementById("humadity");
    const currentClouds = document.getElementById("cloudy");
    const currentWind = document.getElementById("wind");
    const currentDescription = document.getElementById("forecast-text");
    const currentWeatherIcon = document.getElementById("forecast-icon");
    const currentforecastDegree = document.getElementById("forecast-degree");
    const currentLargeIcon = document.getElementById("large-icon");

    try {
      const city = document.getElementById('cityInput').value.trim();
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      const cityName = data.name;
      const cityTemp = data.main.temp;
      const cityTempMax = data.main.temp_max;
      const cityTempMin = data.main.temp_min;
      const cityHumidity = data.main.humidity;
      const cityClouds = data.clouds.all;
      const cityWind = data.wind.speed;
      const weatherDescription = data.weather[0].main;
      const weatherIconCode = data.weather[0].icon;

      currentCity.textContent = cityName;
      currentTemp.textContent = `${cityTemp}°`;
      currentTempMax.textContent = `${cityTempMax}°`;
      currentTempMin.textContent = `${cityTempMin}°`;
      currentHumidity.textContent = `${cityHumidity}%`;
      currentClouds.textContent = `${cityClouds}%`;
      currentWind.textContent = `${cityWind}km/h`
      currentDescription.textContent = `${weatherDescription}`;
      currentWeatherIcon.src = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
      currentforecastDegree.textContent = `${cityTemp}°`;
      currentLargeIcon.src = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;

      if (response.ok) {
        let array = localStorage.getItem('cities');
        if (!array) {
          localStorage.setItem('cities', JSON.stringify(new Array(cityName)));
        } else {
          let storedArrayJSON = localStorage.getItem('cities');
          // Parse the JSON string back into an array
          let storedArray = JSON.parse(storedArrayJSON);
          // Modify the array (for example, let's add an element)
          storedArray.push(cityName);
          // Convert the modified array back into a JSON string
          let updatedArrayJSON = JSON.stringify(storedArray);
          // Store the updated JSON string in local storage
          localStorage.setItem('cities', updatedArrayJSON);
        }

      } else {
        console.error('API request failed with status code:', response.status);
      }

    } catch (error) {
      console.error('Error fetching city name data:', error);
    }
  }

  function openSideTab() {
    console.log('openSideTab');
    historyContainer.classList.remove('hidden');
    // container.style.display = 'block';

    const cities = JSON.parse(localStorage.getItem('cities'));
    const outputUl = document.getElementById('output');

    cities.forEach(element => {
      const li = document.createElement('li');
      li.textContent = element;
      outputUl.appendChild(li);
    });
  }

  function closeTab() {
    console.log('closeTab');
    historyContainer.classList.add('hidden');
  }

  document.querySelector('.search-bar img').addEventListener('click', getWeather);
  document.querySelector('.weather-history').addEventListener('click', openSideTab);
  
  const historyContainer = document.querySelector('.history-container');
  historyContainer.querySelector('.close-btn').addEventListener('click', closeTab);