//Getting HTML elements through the predefined methods of document object
const locationInput = document.getElementById("location-id");
const locationName = document.getElementById("location-name");
const description = document.getElementById("description");
const degress = document.getElementById("temperature");
const cloudIcons = document.getElementById("cloud-img");
const cardContainer = document.getElementById("weather-cards");
const errorMessage = document.getElementById("error-text");
const getWeatherButton = document.getElementById("get-weather");
const modalPopUp = document.getElementById("my-modal");
const closeIcon = document.getElementsByClassName("close")[0];

const apiKey = "RGLWMCQF2M8HJUNW5BWFHTQF5";

//Fetching the API response of today and next 1 week weather report on click of Get Weather Button
getWeatherButton.onclick = function() {
  let letters = /^[A-Z a-z]+$/;
    if(locationInput.value === "") {
      modalPopUp.style.display = "block";
      errorMessage.innerHTML = "Please enter a city name excluding special characters. For example: Hyderabad.";
      closeModal();
    }
    else if(locationInput.value.match(letters)) {
      getWeather();
    }
    else {
      modalPopUp.style.display = "block";
      errorMessage.innerHTML = "Please enter alphabets only, special characters and numbers are not allowed.";
      closeModal();
    }
}

function getWeather() {
  let card = "";
  let city = locationInput.value;
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;
  fetch(url, {
      "method": "GET"
  })
  .then(response => {
      return response.json();
  })
  .then(data => {
    if(data.length!==0 && data.address.length === city.length) {
      errorMessage.innerHTML = "";
      degress.innerHTML = data.days[0].temp+`<span class="id">&nbsp;&deg;</span><span>&nbsp;C</span>`;
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
      closeModal();
    }
  });
}


//getIcon(): this method used for getting the icons based on weather condition
function getIcon(condition) {
  //if else approach
    if (condition === "partly-cloudy-day") {
      return `<img src="https://i.ibb.co/PZQXH8V/27.png" width="40px" height="40px" alt="weather icon" />`;
    } else if (condition === "partly-cloudy-night" || condition === "cloudy") {
      return `<img src="https://i.ibb.co/Kzkk59k/15.png" width="40px" height="40px" alt="weather icon" />`;
    } else if (condition === "rain") {
      return `<img src="https://i.ibb.co/kBd2NTS/39.png" width="40px" height="40px" alt="weather icon" />`;
    } else if (condition === "clear day") {
      return `<img src="https://i.ibb.co/rb4rrJL/26.png" width="40px" height="40px" alt="weather icon" />`;
    } else if (condition === "clear night") {
      return `<img src="https://i.ibb.co/1nxNGHL/10.png" width="40px" height="40px" alt="weather icon" />`;
    } else {
      return `<img src="https://i.ibb.co/rb4rrJL/26.png" width="40px" height="40px" alt="weather icon" />`;
    }
}

//getDayName(): this method used for converting date to day format
function getDayName(date) {
    let day = new Date(date);
    let days = [
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

function closeModal() {
  // When the user clicks the modal
  closeIcon.onclick = function() {
    modalPopUp.style.display = "none";
  }
}


