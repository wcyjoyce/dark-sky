const geocode = require("./utilities/geocode.js");
const forecast = require("./utilities/forecast.js");

const query = process.argv[2];

geocode(query, (error, data) => {
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
