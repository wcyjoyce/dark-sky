const geocode = require("./utilities/geocode.js");
const forecast = require("./utilities/forecast.js");

//////////

geocode("Boston", (error, data) => {
  if (error) {
    return console.log(error);
  };

  forecast(data.lng, data.lat, (error, forecastData) => {
    if (error) {
      return console.log(error);
    };

    console.log("Location: ", data.location);
    console.log("Forecast: ", forecastData);
  });
});
