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
  x.innerHTML = "Latitude: " + lat + "<br>Longitude: " + long;
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
function fetchRandomRestaurant(latitude, longitude) {
  // Construct the URL for the backend endpoint passing in location data
  const backendURL = `http://localhost:3000/restaurants?latitude=${latitude}&longitude=${longitude}`;

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
      // Assuming there is a <div> element with id "restaurant-info" where you want to display the restaurant info
      const restaurantInfoDiv = document.getElementById('result');
      restaurantInfoDiv.innerHTML = `
          <h2>${restaurant.name}</h2>
          <p>Rating: ${restaurant.rating}</p>
          <p>Address: ${restaurant.location.address1}</p> 
          `;
          //Add more display info such as image, phone, yelp url
  }
