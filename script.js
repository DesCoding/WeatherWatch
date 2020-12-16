var city = "Atlanta";
var latitude = "";
var longitude = "";

//API key from open weather 
var APIKey = "9dfa6457815c2b95699d77e603110552"

var forecast

//API call from open weather API
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

$.ajax({
    url: queryURL,
    method: "GET"})