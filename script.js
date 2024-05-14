var btn = document.getElementById("lat/long");
btn.addEventListener("click",getLocation);

const successCallback = (position) => {
  console.log(position);
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

//gets location and displays it, in terms of longitude and latitude
const x = document.getElementById("lat/long");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getAndDisplayPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
  
function getAndDisplayPosition(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  x.innerHTML = "Latitude: " + lat + "<br>Longitude: " + long;
  document.getElementById("latitude").value = lat;
  document.getElementById("longitude").value = long;
}
  
document.getElementById("gen").addEventListener("click", generateRestaurant);

function generateRestaurant(){ //function for generating restaurant
    console.log("generate button clicked");
    const latitude = parseFloat(document.getElementById("latitude").value); 
    const longitude = parseFloat(document.getElementById("longitude").value);
    //Test and print to console after input
    console.log(latitude);
    console.log(longitude);

    //Validate latitude and longitude inputs
    if (!latitude || !longitude) {
      alert("Please enter latitude and longitude values.");
      return;
    }
    if (isNaN(latitude) || isNaN(longitude)) {
      alert("Latitude and longitude must be numerical values.");
      return;
    }
    if (latitude < -90 || latitude > 90) {
      alert("Latitude must be between -90 and 90 degrees.");
      return;
    }
    if (longitude < -180 || longitude > 180) {
      alert("Longitude must be between -180 and 180 degrees.");
      return;
    }

    //Call function to fetch random restaurant based on location
    fetchRandomRestaurant(latitude, longitude);
}

//Here you make requests to your backend server passing the location data
function fetchRandomRestaurant(latitude, longitude) {
  // Construct the URL for the backend endpoint passing in location data
  const backendURL = `https://dinefinder-backend.onrender.com/restaurants?latitude=${latitude}&longitude=${longitude}`;

  // Make a GET request to the backend
  fetch(backendURL)
      .then(response => {
          if (response.ok) {
              return response.json(); // Parse JSON response
          } else {
              throw new Error('Failed to fetch restaurants from backend');
          }
      })
      .then(data => {
          console.log('Response from backend:', data);
          // Handle the response data as needed
          if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomRestaurant = data[randomIndex];
            displayRestaurant(randomRestaurant);
            console.log('Randomly selected restaurant:', randomRestaurant);
            // Further processing with the random restaurant
          } else {
            alert('No restaurants found in the response.');
          }
      })
      .catch(error => {
          console.error('Error fetching restaurants from backend:', error.message);
      });
    }


function displayRestaurant(restaurant) {
  // Construct the URL with query parameters containing the restaurant information
  const infoUrl = `info.html?name=${encodeURIComponent(restaurant.name)}&rating=${restaurant.rating}&address=${encodeURIComponent(restaurant.location.display_address)}&phone=${restaurant.display_phone}&image=${encodeURIComponent(restaurant.image_url)}&url=${encodeURIComponent(restaurant.url)}`;

  // Navigate the current tab to the constructed URL
  window.location.href = infoUrl;
}










