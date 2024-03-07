var btn = document.getElementById("center");
btn.addEventListener("click",sayHello);

function sayHello(){
    alert("Hello!");
}

// Geolocation API, location pop up
const successCallback = (position) => {
    console.log(position);
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// async function findRestaurant() {
//   if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async function(position) {
//           var lat = position.coords.latitude;
//           var lng = position.coords.longitude;

//           const response = await fetch('https://api.yelp.com/v3/businesses/search?latitude=' + lat + '&longitude=' + lng + '&categories=restaurants', {
//               headers: {
//                   'Authorization': 'Bearer pxpuU19gDhxBiwnQ4shNHcjX-WOCHr7hy5O6LIvqR38leKvabywinbTNsfSuEG2baO_TIXbSEH7-Mi_fvVF-rGZkF9YmiQeBlUn2cQdhmQNDuLBJXJp1xClUiqzPZXYx'
//               }
//           });

//           if (response.ok) {
//               const data = await response.json();
//               var randomIndex = Math.floor(Math.random() * data.businesses.length);
//               var restaurant = data.businesses[randomIndex];
//               document.getElementById('restaurant').textContent = restaurant.name;
//           } else {
//               console.error('HTTP error', response.status);
//           }
//       });
//   } else {
//       alert("Geolocation is not supported by this browser.");
//   }
// }
