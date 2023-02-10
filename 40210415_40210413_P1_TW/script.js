const apiKey = '8b658edcbe195a770a61481d82919aa8';
const weatherDiv = document.getElementById('weather');
const locationForm = document.getElementById('location-form');
const umidityElement = document.querySelector("#umidity span");
const geolocationButton = document.getElementById("geolocation-button");


geolocationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        getWeatherByGeolocation(lat, long);
        console.log(position)
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Usuário negou a solicitação de Geolocalização.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Informação de localização não está disponível.");
            break;
          case error.TIMEOUT:
            alert("A requisição expirou.");
            break;
          case error.UNKNOWN_ERROR:
            alert("Erro desconhecido.");
            break;
        }
      }
    );
  } else {
    alert("Este navegador não suporta geolocalização.");
  }
});

function coordResults(lat, long) {
  fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
 
    .then(response => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`)
      }
      return response.json();
    })
    .catch(error => {
      alert(error.message)
    })
    .then(response => {
      displayResults(response)
    });

}
locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.getElementById('location-input').value;
  getWeather(location);
  
});

function goBack() {
  history.back();
}
async function getWeatherByGeolocation(lat, long) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&id=524901&lang=pt_Br`);
    const data = await response.json();

    weatherDiv.innerHTML = `
      <h2>Clima em ${data.name}</h2>
      <p><i class="fa-solid fa-temperature-three-quarters"></i>: ${data.main.temp} °C </p>
      <p><i class="fa-solid fa-temperature-quarter"></i>: ${data.main.feels_like} °C</p>
      <p><i class="fa-solid fa-cloud"></i>: ${data.weather[0].description}</p>
      <p><i class="fa-solid fa-wind"></i>: ${data.wind.speed} m/s</p>
      <p><i class="fa-solid fa-droplet"></i>: ${data.main.humidity}%</p>
    `;
  } catch (error) {
    console.log(error);
  }
}


async function getWeather(location) {

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&id=524901&lang=pt_Br`);

    const data = await response.json();
    weatherDiv.innerHTML = `
      <h2>Clima em ${data.name}</h2>
      <p><i class="fa-solid fa-temperature-three-quarters"></i>: ${data.main.temp} °C </p>
      <p><i class="fa-solid fa-temperature-quarter"></i>: ${data.main.feels_like} °C</p>
      <p><i class="fa-solid fa-cloud"></i>: ${data.weather[0].description}</p>
      <p><i class="fa-solid fa-wind"></i>: ${data.wind.speed} m/s</p>
      <p><i class="fa-solid fa-droplet"></i>: ${data.main.humidity}%</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = `<p>Localização não encontrada.</p>`;
    console.log(error);
  }


}


