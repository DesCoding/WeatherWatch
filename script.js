var city = $("#user-input").val();
var latitude = "";
var longitude = "";
//variable for moment.js 
var now = moment();

var citiesArray = ["Atlanta"];

//API key from open weather 
var APIKey = "9dfa6457815c2b95699d77e603110552"

var forecast = $("#five-day-forecast")
var currentWeatherDisplay = $("#current-weather")

//Event listener and JQuery val method to return value of first matched element in the OpenWeatherAPI data
$("#submit-btn").on("click", function(){
    city = $("#user-input").val();
    console.log("typed city: " + city);

    openWeatherAPIRequest();
});

//use keypress to detect if enter was pressed and use prevent default to determine if method was called by an event handler
$(document).keypress(
    function(event){
        if (event.which == '13') {
            event.preventDefault();
            city = $("user-input").val();
            console.log("typed city: " + city);

            openWeatherAPIRequest();
            $("#user-input:").val("")
            }    
    });

//checks to see which cities are in the array and stores new cities
function saveCityToArray(object) {
    if (citiesArray.includes(object.name)) {
        console.log("city name already selected");
        return;
    } else {
        citiesArray.push(object.name);
        storedCities();
    };
};

//API call from open weather API for current day
function openWeatherAPIRequest() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    //jQuery ajax method pulls info from the API
    $.ajax({
     url: queryURL,
     method: "GET"
     //.then promises to retun the function (in this API) and captures the response
    }).then(function (response) {
        console.log("response: ", response);

        saveCityToArray(response);
        $("#current-city-name").text(response.name);
        $("#current-date").text(now.format("MMMM Do YYYY"));
    
        console.log("Currently saved cities:  ", citiesArray);
        currentWeatherDisplay.empty();
        forecast.empty();
        latitude = response.coord.lat;
        longitude = response.coord.lon;

        coordinates (latitude, longitude);
    });

};

//API call from open weather API for five day
function openWeatherAPIRequestFive() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    //jQuery ajax method pulls info from the API
    $.ajax({
     url: queryURL,
     method: "GET"
     //.then promises to retun the function (in this API) and captures the response
    }).then(function (response) {
        console.log("response: ", response);

        //displayFiveDayForecast(response);
        for (var i = 3; i < response.list.length; i = i+8){
        displayFiveDayForecast(response.list[i], response.list[i].dt_txt)
        }
        // $("#current-city-name").text(response.name);
        // $("#current-date").text(now.format("dddd mmmm do"));
    
        // console.log("Currently saved cities:  ", citiesArray);
        // currentWeatherDisplay.empty();
        // forecast.empty();
        // latitude = response.coord.lat;
        // longitude = response.coord.lon;

        // coordinates (latitude, longitude);
    });

    

};



//Create buttons for city info
function generateButtons(){

    var btnGroup = $(".button-group");
    btnGroup.empty();
    displayStoredCities();

    citiesArray.forEach(element => {
        var cityBtn = $("<button type='button' class='city-btn btn btn-dark btn-lg btn-block'>");
        cityBtn.text(element);
        btnGroup.append(cityBtn);
        console.log("cities: " + element);
        console.log(cityBtn);
    });
};


function coordinates(latitude, longitude) {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
     //jQuery ajax method pulls info from the API
    $.ajax({
        url: queryURL,
        method: "GET"
        //.then promises to retun the function (in this API) and captures the response
    }).then(function (response) {

        currentWeather(response.current);
        console.log(response);
        //for loop to find five day forecast
        // for (i = 1; i < 6; i++){

        //     console.log("five day: ", response.daily[i]);
        //     displayFiveDayForecast(response.daily[i], now.add(i, 'days').foremat("dddd"));
        // };

        generateButtons();

        $(".city-btn").on("click", function () {
            console.log("clicked");
            city = $(this).text();
            console.log("clicked city: " + this.text())

            openWeatherAPIRequest();
            openWeatherAPIRequestFive();
        });

    });
};

function currentWeather(current) {
var iconcode = current.weather[0].icon;
var iconURL = "https://openweathermap.org/img/w/" + iconcode + ".png";
$("#current-icon").attr("src", iconURL);

var temp = Math.floor((current.temp - 273.15) * 1.80 + 32);

var currentTemp = $("<h4>").text("Temperature: " + temp + " °F");
var currentHumidity = $("<h4>").text("Humidity: " + current.humidity + "%");
var currentWind = $("<h4>").text("Wind Speed: " + current.wind_speed + " MPH");
var currentUV = $("<h4 id='uvi'> ").text("UV Index: ");

if (current.uvi <= 2) {
    currentUV.append("<span id='uvi-low'>" + current.uvi);
} else if (current.uvi > 2 && current.uvi <= 7) {
    currentUV.append("<span id='uvi-mid'>" + current.uvi);
}else if ( current.uvi > 7){
    currentUV.append("<span id='uvi-high'>" + current.uvi);
}

currentWeatherDisplay.append(currentTemp, currentHumidity, currentWind, currentUV);
console.log(current);
};



function displayFiveDayForecast(daily, date) {
console.log("here?")
console.log("daily", daily)
var temp = Math.floor((daily.main.temp - 273.15) * 1.80 + 32);

console.log(temp)
var card = $("<div class='card daily-forecast'>");
//Create card div and adding date parameter
var cardBody = $("<div class='card-body'>");
var cardTitle = $("<h3 class='card-title text-center'>").text(date);

var iconcode = daily.weather[0].icon;
var iconURL = "https://openweathermap.org/img/w/" + iconcode + ".png";
var icon = $("<img class='icons' src=" + iconURL + " alt='Weather icon'>");

var futureTemp = $("<h5>").text("Temp:  " + temp + " °F");
var futureHumidity = $("<h5>").text("Humidity: " + daily.humidity + "%");

cardBody.append(cardTitle, $("<hr>"), icon, futureTemp, futureHumidity);
card.append(cardBody);
forecast.append(card);
};


function storeCities() {
localStorage.setItem("savedCities", JSON.stringify(citiesArray));
};

function displayStoredCities() {

var storedCities = JSON.parse(localStorage.getItem("savedCities"));

if (storedCities != null) {
    citiesArray = storedCities;
};
};

openWeatherAPIRequest();
openWeatherAPIRequestFive();





