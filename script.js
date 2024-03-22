var btn = document.getElementById("gen");
btn.addEventListener("click",findRandomRestaurant);

function sayHello(){
    alert("Hello!");
}

//gets location and displays it, in terms of longitude and latitude
  // const x = document.getElementById("restaurant");
  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(getAndDisplayPosition);
  //   } else {
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  // }
  
  // function getAndDisplayPosition(position) {
  //   const lat = position.coords.latitude;
  //   const long = position.coords.longitude;
  //   x.innerHTML = "Latitude: " + lat +
  //   "<br>Longitude: " + long;
  // }
  
  // Geolocation code 
// const successCallback = (position) => {
//   console.log(position);
//   };
  
//   const errorCallback = (error) => {
//     console.log(error);
//   };
  
// navigator.geolocation.getCurrentPosition(successCallback,errorCallback);

    const apiKey = 'pxpuU19gDhxBiwnQ4shNHcjX-WOCHr7hy5O6LIvqR38leKvabywinbTNsfSuEG2baO_TIXbSEH7-Mi_fvVF-rGZkF9YmiQeBlUn2cQdhmQNDuLBJXJp1xClUiqzPZXYx';
    const endpoint = 'https://api.yelp.com/v3/businesses/search';
    
    function findRandomRestaurant() {
      const location = prompt('Enter your location (e.g., New York):');
      if (!location) return;

      const searchTerm = 'restaurants';
      const url = `${endpoint}?term=${searchTerm}&location=${location}`;

      fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Filter the results to include only restaurants
        const restaurantResults = data.businesses.filter(business => {
          return business.categories.some(category => category.alias === 'restaurants');
        });
        
        // If no restaurants found, display a message
        if (restaurantResults.length === 0) {
          displayRandomRestaurant('No restaurants found in the specified location.');
          return;
        }

        // Select a random restaurant
        const randomIndex = Math.floor(Math.random() * restaurantResults.length);
        const randomRestaurant = restaurantResults[randomIndex];

        // Display the random restaurant
        displayRandomRestaurant(randomRestaurant.name);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

    function displayRandomRestaurant(restaurantName) {
      const randomResultElement = document.getElementById('restaurant');
      randomResultElement.innerHTML = `<h2>Random Restaurant:</h2><p>${restaurantName}</p>`;
    }



























