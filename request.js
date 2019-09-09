const request = require("request");
const chalk = require("chalk");

const accessToken = "pk.eyJ1Ijoid2N5am95Y2UiLCJhIjoiY2swNXg3NTlpM3B3NDNibXZqaWF0a2dlaiJ9.npfswSTgFPg3uwWzSR0KMg"
const lang = "en" || "zh-tw";

// TODO:
// 1) Post HTTP request to Dark Sky URL
// 2) Get response and parse it as JSON
// 3) Print a small forecast to the user based on queried location
// 4) Example: "It is currently 58.55 degrees outside. There is a 0% chance of rain."

const query = "hong kong";

let location = "";
query.split("").forEach(char => {
  const letter = char === " " ? "%20" : char;
  location += letter;
});

const geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${accessToken}&limit=1`;

request({ url: geocodingURL, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service.");
  } else if (response.body.message === "Forbidden" || response.body.error || response.body.features.length === 0) {
    console.log("Unable to find location.")
  } else {
    const result = response.body.features[0];
    const place = result.place_name;
    const lng = result.center[0];
    const lat = result.center[1];

    const weatherURL = `https://api.darksky.net/forecast/c8a501c907394ac466641f19b0986dc6/${lat},${lng}?units=si&lang=${lang}`;

    request({ url: weatherURL, json: true }, (error, response) => {
      const data = response.body;

      const tempMessage = lang === "zh-tw" ? "天氣現在" + data.currently.temperature + "度。" : "It is currently " + data.currently.temperature + "º outside. ";
      const precipMessage = lang === "zh-tw" ? "下雨機率為" + Math.round(data.currently.precipProbability * 100) + "%。" : "There is a " + Math.round(data.currently.precipProbability * 100) + "% chance of rain.";

      console.log(chalk.inverse(`Selected timezone: ${place} (${lat.toFixed(2)}, ${lng.toFixed(2)})`));
      console.log(tempMessage + precipMessage);
      console.log(data.daily.summary);
    });
  };
});
