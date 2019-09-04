const request = require("request");

const url = "https://api.darksky.net/forecast/c8a501c907394ac466641f19b0986dc6/37.8267,-122.4233";

request({ url }, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data.currently);
});
