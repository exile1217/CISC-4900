var btn = document.getElementById("lat/long");
btn.addEventListener("click",getLocation);

function sayHello(){
    alert("Hello!");
}

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
  }
  
  document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var latitude = document.getElementById('latitude').value;
    var longitude = document.getElementById('longitude').value;
    findRandomRestaurant(latitude, longitude);
  });
  
  function findRandomRestaurant(latitude, longitude) {
    var url = 'https://api.yelp.com/v3/businesses/search?latitude=' + latitude + '&longitude=' + longitude + '&categories=restaurants&limit=50';
    var apiKey = 'YOUR_YELP_API_KEY';
  
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + apiKey
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.businesses && data.businesses.length > 0) {
        var randomIndex = Math.floor(Math.random() * data.businesses.length);
        var randomRestaurant = data.businesses[randomIndex];
        displayRestaurant(randomRestaurant);
      } else {
        displayError('No restaurants found');
      }
    })
    .catch(error => {
      alert('Error fetching restaurants: ' + error.message);
    });
  }
  
  function displayRestaurant(restaurant) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    var name = document.createElement('h2');
    name.textContent = restaurant.name;
    var address = document.createElement('p');
    address.textContent = restaurant.location.address1 + ', ' + restaurant.location.city;
    resultDiv.appendChild(name);
    resultDiv.appendChild(address);
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