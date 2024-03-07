var btn = document.getElementById("gen");
btn.addEventListener("click",sayHello);
function sayHello(){
    alert("Hello!");
}

const successCallback = (position) => {
    console.log(position);
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  