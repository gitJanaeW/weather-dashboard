// VARIABLES
// Selectors
var forecastSectionEl = document.querySelector(".forecast-section");
var searchBtnEl = document.querySelector(".search-btn");
var inputEl = document.querySelector(".input");
var cityInfoEl = document.querySelector(".city-info");
var cityStatsEl = document.querySelector(".city-stats");
var cityNameEl = document.querySelector(".city-name");
var cityDateEl = document.querySelector(".city-date");
var cityStatsEl = document.querySelector(".city-stats");

var emptyMainEl = document.createElement("div");
var input = undefined;
// Global elements
var promptEl = document.createElement("p");
var allCityDetails = undefined;
// Checkers
var emptyPage = false;
// time and date
var m = moment().format("dddd, MMMM Do, YYYY, h:mm a");


// PROMPT USER TO INPUT CITY
function createEmptyPage(){
    forecastSectionEl.appendChild(emptyMainEl);

    var cloudEl = document.createElement("img");
    cloudEl.className = "prompt-cloud";
    cloudEl.setAttribute("src", "./assets/images/clouds.png"); // Image source: https://www.iconsdb.com/gray-icons/clouds-2-icon.html
    emptyMainEl.appendChild(cloudEl);

    promptEl.className = "prompt-text";
    promptEl.textContent = "Select a city name to see the forecast.";
    emptyMainEl.appendChild(promptEl);
    
    emptyPage = true;
}

// GET DESIRED CITY
function getCityInput(e){
    e.preventDefault();

    input = inputEl.value.trim();
    inputEl.value = "";
    if(input === ""){
        return;
    }else{
        fetchCityWeather(input);
        console.log(m);
    }
}

// FETCH API AND PARSE RESULTS
function fetchCityWeather(cityName){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=20d2e8b234ab2aab32059e9826a39af0";
    console.log("apiUrl", apiUrl);
    fetch(apiUrl).then(function(response){
        if(response.ok){
            // Parse the response (data) with json
            response.json().then(function(data){
                // save data globally
                allCityDetails = data;
                // push that data into getResults()
                returnResults(data);
            });
        }else{
            promptEl.textContent = "Error: City Name Not Found.";
            promptEl.style.fontStyle =  "italic";
            promptEl.style.fontWeight = "bold";
        }
    });
    
}

// GET THE RESULTS FOR THE CITY SELECTED
function returnResults(cityResults){
    printCityInfo();
    printFiveDayForecast();
    console.log("long", cityResults.coord.lon);
}

function printCityInfo(){
    if(emptyPage){
        forecastSectionEl.removeChild(emptyMainEl);
    }
    cityInfoEl.removeAttribute("hidden");
    // create city header info
    cityNameEl.textContent = allCityDetails.name;
    cityDateEl.textContent = m;
    // create city stats
    for(var i = 0; i < cityStatsEl.childElementCount; i++){
        
    }
}

function printFiveDayForecast(){
    console.log("print five day forecast");
}


createEmptyPage();

searchBtnEl.addEventListener("click", getCityInput);