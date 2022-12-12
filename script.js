/**
 * Weather App
 * TODO: Complete getWeatherData() to return json response Promise
 * TODO: Complete searchCity() to get user input and get data using getWeatherData()
 * TODO: Complete showWeatherData() to set the data in the the html file from response
 */

/* DIV ID's you'll need access to 👇
"city-name"
"weather-type"
"temp"
"min-temp"
"max-temp"
*/

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this:
 * https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=4f659b69081eb387321756a3c36d9853&units=metric
 */
const apikey = "4f659b69081eb387321756a3c36d9853";
const getWeatherData = (city) => {
  //HINT: Use template literals to create a url with input and an API key
  //CODE GOES HERE
  const url = "https://api.openweathermap.org/data/2.5/weather?q";
  const fullurl = `${url}=${city}&appid=${apikey}&units=metric`;
  const weatherPromise = fetch(fullurl);
  return weatherPromise.then((response) => {
    return response.json();
  });
};

/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
const searchCity = async () => {
  let city = document.getElementById("city-input").value;
  // CODE GOES HERE
  console.log(city);
  getWeatherData(city)
    .then((data) => {
      console.log(data);
      showWeatherData(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const entersearchCity = (event) => {
  if (event.keyCode === 13) {
    searchCity();
  }
};

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
const showWeatherData = (weatherData) => {
  //CODE GOES HERE
  document.getElementById("city-name").innerText = weatherData.name;
  document.getElementById("weather-type").innerText =
    weatherData.weather[0].main;
  document.getElementById("temp").innerText = weatherData.main.temp;
  document.getElementById("min-temp").innerText = weatherData.main.temp_min;
  document.getElementById("max-temp").innerText = weatherData.main.temp_max;
};

document
  .getElementById("city-input")
  .addEventListener("keyup", entersearchCity);
