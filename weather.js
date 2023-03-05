const apiKey = '0516b7a9fabacf8fc7557a9801fa33fa';
const city = 'Parana,AR';
const weatherWidget = document.getElementById('weather-widget');

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {
    const temp = data.main.temp.toFixed(1);
    weatherWidget.textContent = `${temp}°C`;
  });
