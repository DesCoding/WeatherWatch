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

//API call from open weather API
function openWeatherAPIRequest() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
    //jQuery ajax method pulls info from the API
    $.ajax({
     url: queryURL,
     method: "GET"
     //.then promises to retun the function (in this API) and captures the response
    }).then(function (response) {
        console.log("response: ", response);

        saveCityToArray(response);
        $("#current-city-name").text(response.name);
        $("#current-date").text(now.format("dddd mmmm do"));
    
        console.log("Currently saved cities:  ", citiesArray);
        currentWeather.empty();
        forecast.empty();
        latitude = response.coord.lat;
        longitude = response.coord.lon;

        coordinates (latitude, longitude);
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

        for (i = )

    })






}