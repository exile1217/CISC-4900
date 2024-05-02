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
  //  display function on home page
  //     function displayRestaurant(restaurant) {
  //       const restaurantInfoDiv = document.getElementById('result');
  //       restaurantInfoDiv.innerHTML = `
  //           <h2>${restaurant.name}</h2>
  //           <p>Rating: ${restaurant.rating}</p>
  //           <p>Address: ${restaurant.location.display_address}</p> 
  //           `;
  //         //Add more display info such as image, phone, yelp url
  // }
    
  //display function on separate page
  function displayRestaurant(restaurant) {
    // Create a new window to display the restaurant information
    const newWindow = window.open("info.html");

    // Check if the new window has been opened successfully
    if (newWindow) {
        // Once the new window is loaded, inject the restaurant information into it
        newWindow.onload = function() {
            // Access the document of the new window
            const newWindowDocument = newWindow.document;

            // Find the element in the new window where you want to display the restaurant information
            const restaurantInfoDiv = newWindowDocument.getElementById('result');
            const imageSize = 'width="300" height="250"'; //image size
            // Check if the element exists in the new window
            if (restaurantInfoDiv) {
                // Inject the restaurant information into the element
                restaurantInfoDiv.innerHTML = `
                <img src="${restaurant.image_url}" alt="${restaurant.name}"${imageSize}>
                <h2>${restaurant.name}</h2>
                <p>Rating: ${restaurant.rating}</p>
                <p>Address: ${restaurant.location.display_address}</p>
                <p>Phone: ${restaurant.display_phone}</p>
                <a href="${restaurant.url}" target="_blank" style="color:paleturquoise;"> Yelp </a>
                <p>
                <a href="index.html" style="color: paleturquoise;"> Home Page</a>
                `;
            } else {
                // If the element is not found, display an error message
                console.error("Element with ID 'result' not found in the new window.");
            }
        };
    } else {
        // If the new window failed to open, display an error message
        console.error("Failed to open new window.");
    }
}







