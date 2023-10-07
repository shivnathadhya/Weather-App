// let unix = 1680092414;
// let date = new Date(unix * 1000);

// console.log(date); // 2017-10-08T14:35:44.000Z

// output -> Wed Mar 29 2023 17:50:14 GMT+0530 (India Standard Time)

// var d = new Date();    //system date and time
// console.log(d.getHours());   // => 9
// console.log(d.getMinutes());   // =>  30
// console.log(d.getSeconds());   // => 51

const container = document.querySelector(".container"),
  search = document.querySelector(".search-box button"),
  weatherBox = document.querySelector(".weather-box"),
  weatherDetails = document.querySelector(".weather-details"),
  notFound = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const apiKey = "4f659b69081eb387321756a3c36d9853";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        notFound.classList.add("fadeIn");
        notFound.style.display = "block";
        weatherBox.classList.remove("fadeIn");
        weatherBox.style.display="none"
        weatherDetails.classList.remove("fadeIn");
        weatherDetails.style.display="none"
      } else {
        notFound.classList.remove("fadeIn");
        notFound.style.display = "none";
        weatherBox.classList.add("fadeIn");
        weatherBox.style.display = "block";
        weatherDetails.classList.add("fadeIn");
        weatherDetails.style.display = "flex";
        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const wind = document.querySelector(
          ".weather-details .main .wind-div span"
        );
        const sunrise = document.querySelector(
          ".weather-details .main .sunrise span"
        );
        const sunset = document.querySelector(
          ".weather-details .main .sunset span"
        );
        const humidity = document.querySelector(
          ".weather-details .others .humidity span"
        );
        const reelfeel = document.querySelector(
          ".weather-details .others .realfeel span"
        );
        const pressure = document.querySelector(
          ".weather-details .others .pressure span"
        );
        const visibility = document.querySelector(
          ".weather-details .others .visibility span"
        );

        const dt = parseInt(json.dt);
        console.log("current time in IST unix", dt);
        const timezone = parseInt(json.timezone);
        console.log("timeDiff in unix", timezone);
        const sysUnix = dt + 300 + timezone - 19800;
        console.log("current local time in unix", sysUnix);
        const localdate = new Date(sysUnix * 1000);
        console.log("current local time", localdate);
        const unixSunrise = parseInt(json.sys.sunrise) + timezone - 19800;
        console.log("sunrise in local unix", unixSunrise);
        const unixSunset = parseInt(json.sys.sunset) + timezone - 19800;
        console.log("sunset in local unix", unixSunset);
        const sunriseDate = new Date(unixSunrise * 1000);
        console.log("sunrise in local time", sunriseDate);
        const sunsetDate = new Date(unixSunset * 1000);
        console.log("sunset in local time", sunsetDate);

        getTimings = (sun) => {
          let hr = sun.getHours().toString();
          let min = sun.getMinutes().toString();
          let time = hr.concat(":", min);
          return time;
        };

        switch (json.weather[0].main) {
          case "Clear":
            if (sysUnix >= unixSunrise && sysUnix < unixSunset) {
              image.src = "image/day.png";
            } else {
              image.src = "image/night.png";
            }
            break;
          case "Clouds":
            if (sysUnix >= unixSunrise && sysUnix < unixSunset) {
              image.src = "image/cloudy-day.png";
            } else {
              image.src = "image/cloudy-night.png";
            }
            break;
          case "Haze":
            image.src = "image/haze.png";
            break;
          case "Snow":
            image.src = "image/snowy.png";
            break;
          case "Rain":
            image.src = "image/rainy.png";
            break;
          case "Thunderstorm":
            image.src = "image/storm.png";
            break;
          case "Mist":
            image.src = "image/mist.png";
            break;
          default:
            image.src = "";
        }

        const windSpeed = (parseInt(json.wind.speed) * 18) / 5;

        const deg = parseInt(json.wind.deg);

        getCardinalDirection = (deg) => {
          let directions = [
            "North",
            "Northeast",
            "East",
            "Southeast",
            "South",
            "Southwest",
            "West",
            "Northwest",
          ];
          return directions[Math.round(deg / 45) % 8];
        };

        const windDir = getCardinalDirection(deg);
        const riseTime = getTimings(sunriseDate);
        const setTime = getTimings(sunsetDate);

        temperature.innerHTML = `${parseInt(json.main.temp)}°C`;
        description.innerHTML = `${json.weather[0].description}`;
        wind.innerHTML = `${windDir} ${windSpeed}Km/h`;
        sunrise.innerHTML = `${riseTime}`;
        sunset.innerHTML = `${setTime}`;
        humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
        reelfeel.innerHTML = `${parseInt(json.main.feels_like)}°C`;
        pressure.innerHTML = `${parseInt(json.main.pressure)}hPa`;
        visibility.innerHTML = `${parseInt(json.visibility)}m`;
      }

      // weatherBox.style.display = "";
      // weatherDetails.style.display = "";
      // container.style.height = "700px";
    });
});
