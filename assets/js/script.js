var forecastSectionEl = document.querySelector(".forecast-section");
var searchBtnEl = document.querySelector(".search-btn");
inputEl = document.querySelector(".input");

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

function getCityInput(e){
    e.preventDefault();
    
    var input = inputEl.value.trim()
    inputEl.value = "";
    if(input === ""){
        return;
    }else{
        console.log(input);
    }
}

createEmptyPage();

searchBtnEl.addEventListener("click", getCityInput);