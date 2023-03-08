const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the city id from the html form, display in console.
    const cityId = req.body.cityIdInput;
    console.log(cityId);
    
    //build up the URL for the JSON query, API Key is secret and needs to be obtained by signup 
    const units = "imperial";
    const apiKey = "67f6b382921c1e89b39b20d4f9556f22";
    const url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&units=" + units + "&appid=" + apiKey;
    
    // this gets the data from Open Weather API
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const cityName = weatherData.name;
            const temperature = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const windDirection = weatherData.wind.deg;
            const cloudiness = weatherData.clouds.all;
            
            // displays the output of the results
            res.write("<h1>Weather in " + cityName + "</h1>");
            res.write("<p>Temperature: " + temperature + " &#8457;</p>");
            res.write("<p>Humidity: " + humidity + " %</p>");
            res.write("<p>Wind Speed: " + windSpeed + " mph</p>");
            res.write("<p>Wind Direction: " + windDirection + " &#176;</p>");
            res.write("<p>Cloudiness: " + cloudiness + " %</p>");
            res.send();
        });
    });
});

//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port");
});
