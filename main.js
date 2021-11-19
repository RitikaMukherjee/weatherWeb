const api = {
    key: "06804f5008bfa32b813f6ff2bf8eeea1",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector(".searchBox");
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
      getResults2(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return ( weather.json());
      }).then(displayResults);  
  }
  function getResults2 (query){
    fetch(`${api.base}/forecast?q=${query}&appid=${api.key}`)
      .then(forecast =>{
      return (forecast.json());
      } )
      .then(displayResults2);
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let feelsLike = document.querySelector('.current .feelsLike');
    feelsLike.innerText = `Feels like ${Math.round(weather.main.feels_like)}°c`
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hiLow');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    
  }
  function displayResults2(forecast){
    let day1 = document.querySelector('.forecast .day1');
    day1.innerText = `day 1: ${Math.round(forecast.list[4].main.temp)-273}°c  ${forecast.list[4].weather[0].main}`;
    let day2 = document.querySelector('.forecast .day2');
    day2.innerText = `day 2: ${Math.round(forecast.list[12].main.temp)-273}°c  ${forecast.list[12].weather[0].main}`
    let day3 = document.querySelector('.forecast .day3');
    day3.innerText = `day 3: ${Math.round(forecast.list[20].main.temp)-273}°c  ${forecast.list[20].weather[0].main}`
    let day4 = document.querySelector('.forecast .day4');
    day4.innerText = `day 4: ${Math.round(forecast.list[28].main.temp)-273}°c  ${forecast.list[28].weather[0].main}`
    let day5 = document.querySelector('.forecast .day5');
    day5.innerText = `day 5: ${Math.round(forecast.list[34].main.temp)-273}°c  ${forecast.list[34].weather[0].main}`
  }
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }