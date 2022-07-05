// VARIABLES
// Selectors
var forecastSectionEl = document.querySelector(".forecast-section");
var searchBtnEl = document.querySelector(".search-btn");
var inputEl = document.querySelector(".input");
var cityInfoEl = document.querySelector(".city-info");
var fiveDayForecastEl = document.querySelector(".five-day-forecast");
var cityNameEl = document.querySelector(".city-name");
var cityDateEl = document.querySelector(".city-date");
var cityStatsEl = document.querySelector(".city-stats");
var allDayBlocks = document.querySelector(".day-blocks");

var emptyMainEl = document.createElement("div");
var input = undefined;
// Global elements
var promptEl = document.createElement("p");
var allCityDetails = undefined;
var allForecastDetails = undefined;
// Checkers and incrementors
var emptyPage = false;
var j = 5;
var i = 0;
// time and date
var m = moment().format("dddd, MMMM Do, YYYY, h:mm a");
// var dt_text = moment().format("YYYY-MM-DD hh:mm:ss");


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
    }
}

// FETCH API AND PARSE RESULTS
function fetchCityWeather(cityName){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=20d2e8b234ab2aab32059e9826a39af0";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            // Parse the response (data) with json
            response.json().then(function(data){
                // save data globally
                allCityDetails = data;
                // push that data into getResults()
                fetchFiveDayForecast();

            });
        }else{
            promptEl.textContent = "Error: City Name Not Found.";
            promptEl.style.fontStyle =  "italic";
            promptEl.style.fontWeight = "bold";
        }
    });
    
}

function fetchFiveDayForecast(){
    var latLong = [allCityDetails.coord.lat, allCityDetails.coord.lon]
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latLong[0] + "&lon=" + latLong[1] + "&appid=20d2e8b234ab2aab32059e9826a39af0";
    console.log("FETCHED:", apiUrl);
    fetch(apiUrl).then(function(response){
        if(response.ok){
            // Parse the response (data) with json
            response.json().then(function(data){
                // save data globally
                allForecastDetails = data;
                printCityInfo();
            });
        }else{
            promptEl = "Error: City Forecast Not Found.";
            promptEl.style.fontStyle =  "italic";
            promptEl.style.fontWeight = "bold";
        }
    });
}

function printCityInfo(){
    // remove empty page, if any
    if(emptyPage){
        forecastSectionEl.removeChild(emptyMainEl);
    }

    // create city info section
    cityInfoEl.removeAttribute("hidden");

    cityNameEl.textContent = allCityDetails.name;
    cityDateEl.textContent = m;

    for(var i = 0; i < 3; i++){
        var cityStatItemEl = document.createElement("p");
        
        if(i === 0){
            cityStatItemEl.textContent = "Temp: " + allCityDetails.main.temp;
        }else if(i === 1){
            cityStatItemEl.textContent = "Wind: " + allCityDetails.wind.speed;
        }else if(i === 2){
            cityStatItemEl.textContent = "Humidity: " + allCityDetails.main.humidity;
        }
        // else if(i === 3){
        //     cityStatItemEl.textContent = "UV Index: " + allCityDetails;
        // }
        else{
            console.log("Out of range");
        }

        cityStatsEl.appendChild(cityStatItemEl);
    }

    // create 5 day forecast section
    fiveDayForecastEl.removeAttribute("hidden");

    // create 5 days blocks
    while(j < 42){
        var dayBlockEl = document.createElement("div");
        // determine background color
        var weatherType = allForecastDetails.list[j].weather[0].id.toString();
        if(weatherType.startsWith("2") // Thunderstorm
        || weatherType.startsWith("6")){ // Snow
            dayBlockEl.style.backgroundColor = "rgb(132, 137, 168)";
        }
        else if(weatherType.startsWith("3") // Drizzle
        || weatherType.startsWith("5")){ // Rain)
            dayBlockEl.style.backgroundColor = "rbg(163, 183, 217)";
        }
        else if(weatherType.startsWith("8") // Clear OR CLouds
        || weatherType){
            dayBlockEl.style.backgroundColor = "rbg(163, 183, 217)";
        }
        allDayBlocks.appendChild(dayBlockEl);

        // For each day block, loop 5 times to add each stat
        for(var x = 0; x < 5; x++){
            if(x === 1){
                var dayStatEl = document.createElement("img");
            }else{
                var dayStatEl = document.createElement("p");
            }
            dayStatEl.className = "day-block-text"

            if(x === 0){
                // ON 1ST LOOP: get the next 5 days of the week
                console.log("Day value", i);
                dayStatEl.textContent = getNextFiveDays(i);
            }else if(x === 1){
                // ON 2ND LOOP: get the weather icon
                console.log("dayStatEl", i);
                if(i === 0){
                    dayStatEl.setAttribute("src", "http://openweathermap.org/img/wn/" + allCityDetails.weather[0].icon + "@2x.png");
                }else{
                    dayStatEl.setAttribute("src", "http://openweathermap.org/img/wn/" + allForecastDetails.list[j].weather[0].icon + "@2x.png");
                }
            }else if(x === 2){
                // ON 3RD LOOP: get the temperature
                if(i === 0){ // If it's the first of 5 days
                    dayStatEl.textContent = "Temp: " + allCityDetails.main.temp;
                }else{
                    dayStatEl.textContent = "Temp: " + allForecastDetails.list[j].main.temp;
                }
            }else if(x === 3){
                // ON 4TH LOOP: get the wind speed
                dayStatEl.textContent = "Wind: " + allForecastDetails.list[j].wind.speed;
            }else if(x === 4){
                // ON THE 5TH LOOP: get the humidity
                dayStatEl.textContent = "Humidity: " + allForecastDetails.list[j].main.humidity;
                j += 8;
            }else{
                console.log("Out of range");
            }
            dayBlockEl.className = "day-block";
            dayBlockEl.appendChild(dayStatEl);
        }
        // increment i to count days
        i++;        
    }
    // reset j
    j = 5;
    i = 0;
}

function getNextFiveDays(dayNum){
    var dayOfWeek = undefined;
    if(dayNum === 0){
        dayOfWeek = moment().format("ddd, MMM Do");
    }else if(dayNum === 1){
        dayOfWeek = moment().add(1,"days").format("ddd, MMM Do");
    }else if(dayNum === 2){
        dayOfWeek = moment().add(2,"days").format("ddd, MMM Do");
    }else if(dayNum === 3){
        dayOfWeek = moment().add(3,"days").format("ddd, MMM Do");
    }else if(dayNum === 4){
        dayOfWeek = moment().add(4,"days").format("ddd, MMM Do");
    }else{
        dayOfWeek = "Exceeded 5-day limit";
    }
    console.log(dayOfWeek);
    return dayOfWeek;
}


// GET THE RESULTS
function returnResults(cityResults){

}
createEmptyPage();

// EVENT LISTENERS
searchBtnEl.addEventListener("click", getCityInput);