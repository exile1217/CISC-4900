var btn = document.getElementById("lat/long");
btn.addEventListener("click",getLocation);


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
  x.innerHTML = "Latitude: " + lat +
  "<br>Longitude: " + long;
  document.getElementById("latitude").value = lat;
  document.getElementById("longitude").value = long;
}
  
document.getElementById("gen").addEventListener("click", generateRestaurant);

function generateRestaurant(){ //function for generating restaurant
    console.log("generate button clicked");
    const latitude = parseFloat(document.getElementById("latitude").value); //maybe should parsefloat??
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
function fetchRandomRestaurant(latitude, longitude){
  //Construct the URL for your backend endpoint
  const backendURL = 'http://localhost:3000';
  
  //Create a JSON object with the latitude and longitude data
  const locationData = { latitude, longitude };

  //Send an HTTP POST request to backend
  fetch(backendURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(locationData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Response from backend:', data);
  })
  .catch(error => {
    console.error('Error sending location to backend:', error);
  });
}
  
// Geolocation code 
// const successCallback = (position) => {
//   console.log(position);
//   };
  
//   const errorCallback = (error) => {
//     console.log(error);
//   };
  
// navigator.geolocation.getCurrentPosition(successCallback,errorCallback);

    // const apiKey = 'pxpuU19gDhxBiwnQ4shNHcjX-WOCHr7hy5O6LIvqR38leKvabywinbTNsfSuEG2baO_TIXbSEH7-Mi_fvVF-rGZkF9YmiQeBlUn2cQdhmQNDuLBJXJp1xClUiqzPZXYx';
    
    // const endpoint = 'https://api.yelp.com/v3/businesses/search';
    // //const endpoint = "http://localhost:3000/search";
    
    // function findRandomRestaurant() {
    //   const location = prompt('Enter your location (e.g., New York):');
    //   if (!location) return;

    //   const searchTerm = 'restaurants';
    //   const url = `${endpoint}?term=${searchTerm}&location=${location}`;

    //   fetch(url, {
    //     headers: {
    //       Authorization: `Bearer ${apiKey}`
    //     }
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     // Filter the results to include only restaurants
    //     const restaurantResults = data.businesses.filter(business => {
    //       return business.categories.some(category => category.alias === 'restaurants');
    //     });
        
    //     // If no restaurants found, display a message
    //     if (restaurantResults.length === 0) {
    //       displayRandomRestaurant('No restaurants found in the specified location.');
    //       return;
    //     }

    //     // Select a random restaurant
    //     const randomIndex = Math.floor(Math.random() * restaurantResults.length);
    //     const randomRestaurant = restaurantResults[randomIndex];

    //     // Display the random restaurant
    //     displayRandomRestaurant(randomRestaurant.name);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //   });
    // }

    // function displayRandomRestaurant(restaurantName) {
    //   const randomResultElement = document.getElementById('restaurant');
    //   randomResultElement.innerHTML = `<h2>Random Restaurant:</h2><p>${restaurantName}</p>`;
    // }