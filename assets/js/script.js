var forecastSectionEl = document.querySelector(".forecast-section");
var searchBtnEl = document.querySelector(".search-btn");
var inputEl = document.querySelector(".input");

var m = moment().format("dddd, MMMM Do, YYYY, h:mm a");


// PROMPT USER TO INPUT CITY
function createEmptyPage(){
    // create new div with a cloud image and prompt message
    var emptyMainEl = document.createElement("div");
    forecastSectionEl.appendChild(emptyMainEl);

    var cloudEl = document.createElement("img");
    cloudEl.className = "prompt-cloud";
    cloudEl.setAttribute("src", "./assets/images/clouds.png"); // Image source: https://www.iconsdb.com/gray-icons/clouds-2-icon.html
    emptyMainEl.appendChild(cloudEl);

    var promptEl = document.createElement("p");
    promptEl.className = "prompt-text";
    promptEl.textContent = "Select a city name to see the forecast.";
    emptyMainEl.appendChild(promptEl);
}

// GET DESIRED CITY
function getCityInput(e){
    e.preventDefault();

    var input = inputEl.value.trim();
    inputEl.value = "";
    if(input === ""){
        return;
    }else{
        getCityWeather(input);
        console.log(moment().format("dddd, MMMM Do, YYYY, h:mm a"));
    }
}

function getCityWeather(cityName){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" + "43.65" + "&lon=" + "79.3" + "&dt=" + "minutely" + "&appid=" + "{20d2e8b234ab2aab32059e9826a39af0}";
    console.log("apiUrl", apiUrl);
}

createEmptyPage();

searchBtnEl.addEventListener("click", getCityInput);