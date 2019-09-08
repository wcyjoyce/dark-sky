// TODO:
// 1) Create a reusable function for getting the weather forecast
// 2) The forecast function should have three potential calls to callback:
        // a) Low level error, pass string for error
        // b) Coordinate error, pass string for error
        // c) Success, pass forecast string for data

const request = require("request");

const forecast = (lat, lng, callback) => {
  const weatherURL = `https://api.darksky.net/forecast/c8a501c907394ac466641f19b0986dc6/${lat},${lng}?units=si`;

  request({ url: weatherURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined)
    } else if (response.body.error) {
      callback("Unable to find location", undefined)
    } else {
      callback(undefined, {
        timezone: response.body.timezone,
        temperature: response.body.currently.temperature,
        precipProbability: response.body.currently.precipProbability,
        forecast: response.body.daily.summary
      });
    };
  });
};

// #1: success
forecast(37.8267, -112, (error, data) => {
  console.log("Error: ", error);
  console.log("Data: ", data);
});

// #2: invalid location
forecast(-122.4233, 37.826, (error, data) => {
  console.log("Error: ", error);
  console.log("Data: ", data);
});

