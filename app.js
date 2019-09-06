const request = require("request");
const chalk = require("chalk");

const lat = "37.8267"
const lng = "-122.4233"
const lang = "zh-tw" || "en";
const url = `https://api.darksky.net/forecast/c8a501c907394ac466641f19b0986dc6/${lat},${lng}?units=si&lang=${lang}`;

// TODO:
// - Print a small forecast to the user
// - Example: "It is currently 58.55 degrees outside. There is a 0% chance of rain."

request({ url, json: true }, (error, response) => {
  const data = response.body;

  const tempMessage = lang === "zh-tw" ? "天氣現在" + data.currently.temperature + "度。" : "It is currently " + data.currently.temperature + "º outside. ";
  const precipMessage = lang === "zh-tw" ? "下雨機率為" + (data.currently.precipProbability * 100) + "%。" : "There is a " + (data.currently.precipProbability * 100) + "% chance of rain.";

  console.log(chalk.inverse("Selected timezone: " + data.timezone));
  console.log(tempMessage + precipMessage);
  console.log(data.daily.summary);
});
