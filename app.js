// Importing our API key
import { API_KEY } from "./key.js";

const app = document.querySelector(".weather-app");
const timeOutput = document.querySelector(".time");
const nameOutput = document.querySelector(".name");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

let weather = {
  apiKey: API_KEY,
  fetchWeather: function (city) {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch(() => {
        alert("City not found, please try again");
        app.style.opacity = "1";
      });
  },
  displayWeather: function (data) {
    const { name, localtime } = data.location;
    const { text, icon } = data.current.condition;
    const { temp_c, humidity, wind_kph, pressure_mb } = data.current;

    console.log(
      name,
      localtime,
      icon,
      text,
      temp_c,
      humidity,
      pressure_mb,
      wind_kph
    );
    document.querySelector("#currentCity").innerText = name;
    document.querySelector(".icon").src = `https:${icon}`;
    document.querySelector(".condition").innerText = text;
    document.querySelector(".temp").innerHTML = `
        ${temp_c}&#176;`;
    document.querySelector(".humidity").innerText = humidity + "%";
    document.querySelector(".wind").innerText = wind_kph + "km/h";
    document.querySelector(".pressure").innerText = pressure_mb + "hPa";

    // Changing time
    const y = parseInt(localtime.substr(0, 4));
    const m = parseInt(localtime.substr(5, 2));
    const d = parseInt(localtime.substr(8, 2));
    const time = localtime.substr(11);

    timeOutput.innerHTML = time;
    // Add the name of city into the page
    nameOutput.innerHTML = data.location.name;

    // Changing BACKGROUND

    // Set defaul time of day
    let timeOfDay = "day";
    // Get the unique id for each weather condition
    const code = data.current.condition.code;

    // Change to night if its night time in the city
    if (!data.current.is_day) {
      timeOfDay = "night";
    }

    if (code == 1000) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
      btn.style.background = "#e5ba92";
      if (timeOfDay == "night") {
        btn.style.background = "#181e27";
      }
    }
    // Same thing for cloudy weather
    else if (
      code == 1003 ||
      code == 1006 ||
      code == 1009 ||
      code == 1030 ||
      code == 1069 ||
      code == 1087 ||
      code == 1135 ||
      code == 1273 ||
      code == 1276 ||
      code == 1279 ||
      code == 1282
    ) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
      btn.style.background = "#fa6d1b";
      if (timeOfDay == "night") {
        btn.style.background = "#181e27";
      }
    }
    // Rain
    else if (
      code == 1063 ||
      code == 1069 ||
      code == 1072 ||
      code == 1150 ||
      code == 1153 ||
      code == 1180 ||
      code == 1183 ||
      code == 1186 ||
      code == 1189 ||
      code == 1192 ||
      code == 1195 ||
      code == 1204 ||
      code == 1207 ||
      code == 1240 ||
      code == 1243 ||
      code == 1246 ||
      code == 1249 ||
      code == 1252
    ) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
      btn.style.background = "#647d75";
      if (timeOfDay == "night") {
        btn.style.background = "#325c80";
      }
    }
    // Snow...
    else {
      app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
      btn.style.background = "#4d72aa";
      if (timeOfDay == "night") {
        btn.style.background = "#1b1b1b";
      }
    }

    // Fade in the page once all is done
    app.style.opacity = "1";
  },
  search: function () {
    this.fetchWeather(search.value);
  },
};

// Add event listnere to the search button
document.querySelector(".submit").addEventListener("click", function (e) {
  // If input field is empty, throw an alert
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    app.style.opacity = "0";
    weather.search();
    search.value = "";
    e.preventDefault();
  }
});

// Add click event to each city in the panel
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    weather.fetchWeather(e.target.innerText);
  });
});

weather.fetchWeather("Kiev");
app.style.opacity = "1";
