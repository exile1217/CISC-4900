This is our server side code. 
server.js is our endpoint used to make requests between the client side with Yelp Fusion API.



Instructions on how to run locally: 


1. Go into your terminal and change your current directory to the Server folder.

2. Once you're in the correct directory, type in 'npm install' and this should install all dependencies.
   You should see node_modules after installing.
   
3. Make sure to also go into script.js and change the backendURL to http://localhost:3000/restaurants?latitude=${latitude}&longitude=${longitude}
   The current endpoint is the server we have hosted on Render so make sure to change it to localhost:3000. This is strongly recommended because
   it provides a more seamless user experience. We are on the free Render plan, and when the server is idle for a short period of time,
   request delays may occur.  

5. Now you can run server by typing in 'node server.js' 

6. Once the local server is running you can go to index.html and test out the app.



