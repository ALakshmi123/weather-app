//Getting HTML elements through the predefined methods of document object
const locationInputField = document.getElementById("location-id");
const locationName = document.getElementById("location-name");
const description = document.getElementById("description");
const temperatureElement = document.getElementById("temperature");
const cloudIcons = document.getElementById("cloud-img");
const cardContainer = document.getElementById("weather-cards");
const errorMessage = document.getElementById("error-text");
const getWeatherButton = document.getElementById("get-weather");
const modalPopUp = document.getElementById("my-modal");
const closeIcon = document.getElementsByClassName("close")[0];

// Grouping All variables
const apiLink = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
const apiKey = "RGLWMCQF2M8HJUNW5BWFHTQF5";
let card;
let letters = /^[A-Z a-z]+$/;
let cityName;
let apiURL="";
let weatherAPIURL;
let imgSource;
let day;
let days;

// Adding On Click Add Event Lister to Get Weather Button.
getWeatherButton.addEventListener("click", handleGetWeatherData);

//handleGetWeatherData(): this method is using for handling the error scenarios based the entering the value of city.
function handleGetWeatherData() {
    if(locationInputField.value === "") {
      modalPopUp.style.display = "block";
      errorMessage.innerHTML = "Please enter a city name excluding special characters. For example: Hyderabad.";
    }
    else if(locationInputField.value.match(letters)) {
      getWeatherData();
    }
    else {
      modalPopUp.style.display = "block";
      errorMessage.innerHTML = "Please enter alphabets only, special characters and numbers are not allowed.";
    }
}

//getAPIURL(): this method is using for returning weather API URL.
function getAPIURL(cityName) {
  weatherAPIURL = `${apiLink}/${cityName}?unitGroup=metric&key=${apiKey}&contentType=json`;
  return weatherAPIURL;
}

//Fetching the API response of today and next 1 week weather report on click of Get Weather Button
function getWeatherData() {
  cityName = locationInputField.value;
  apiURL = getAPIURL(cityName);
  fetch(apiURL, {
      "method": "GET"
  })
  .then(response => {
      return response.json();
  })
  .then(data => {
    if(data.length!==0 && data.address.length === cityName.length) {
      card="";
      temperatureElement.innerHTML = data.days[0].temp+`<span class="id">&nbsp;&deg;</span><span>&nbsp;C</span>`;
      description.innerHTML = data.days[0].conditions;
      cloudIcons.innerHTML = getIcon(data.days[0].icon);
      locationName.innerHTML = data.address;
      weatherCards = data.days.slice(1,8);
      weatherCards.forEach((ele,index) => {
      card +=
      `<div class="container-block" key=${ele.datetime}>
      <div>${getDayName(ele.datetime)}</div>
        <div> ${getIcon(ele.icon)}</div>
          <span>${ele.temp}</span><span class="id"> &deg;</span><span> C</span>
          <div>${ele.description}</div>
      </div>`
      })
      cardContainer.innerHTML = card;
    }
  })
  .catch(err => {
    if(err) {
      errorMessage.innerHTML = "Please enter a valid city name. For example: Hyderabad, New York.";
      modalPopUp.style.display = "block";
    }
  });
}

//getIcon(): this method used for getting the icons based on weather condition
function getIcon(condition) {
  switch(condition){
    case 'partly-cloudy-day':
    imgSource = 'https://i.ibb.co/PZQXH8V/27.png';
    break;
    case 'cloudy':
    imgSource = 'https://i.ibb.co/Kzkk59k/15.png';
    break;
    case 'rain':
    imgSource = 'https://i.ibb.co/kBd2NTS/39.png';
    break;
    case 'clear day':
    imgSource = 'https://i.ibb.co/rb4rrJL/26.png';
    break;
    case 'clear night':
    imgSource = 'https://i.ibb.co/1nxNGHL/10.png';
    break;
    default:
    imgSource = 'https://i.ibb.co/rb4rrJL/26.png';
  }
    return `<img src= ${imgSource} width="40px" height="40px" alt="weather icon"/>`;
}

//getDayName(): this method is using  for converting date to day format.
function getDayName(date) {
    day = new Date(date);
    days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day.getDay()];
}

// Adding On Click Add Event Lister to close icon. 
closeIcon.addEventListener("click", modalClose);

//modalClose(): this method is using for closing the modal.
function modalClose() {
  modalPopUp.style.display = "none";
}


