var city = "Atlanta";
var latitude = "";
var longitude = "";
//variable for moment.js 
var now = moment();

var citiesArray = ["Atlanta"];

//API key from open weather 
var APIKey = "9dfa6457815c2b95699d77e603110552"

var forecast = $("#five-day-forecast")
var currentWeather = $("#current-weather")

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


function saveCityToArray

//API call from open weather API
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

$.ajax({
    url: queryURL,
    method: "GET"})