const geocode = require("./utilities/geocode.js");
const forecast = require("./utilities/forecast.js");

// TODO:
// 1) Input location query via command line argument without yargs
// 2) Only geocode if a location was provided

const query = process.argv[2];

if (!query) {
  console.log("Please provide a location.")
} else {
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
};
