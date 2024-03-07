const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const YELP_API_KEY = 'pxpuU19gDhxBiwnQ4shNHcjX-WOCHr7hy5O6LIvqR38leKvabywinbTNsfSuEG2baO_TIXbSEH7-Mi_fvVF-rGZkF9YmiQeBlUn2cQdhmQNDuLBJXJp1xClUiqzPZXYx';

// Define route for Yelp API proxy
app.get('/', (req, res) => {
    console.log('Request received');
    axios.get('https://api.yelp.com/v3/businesses/search', {
        params: {
            location: 'New York' // Example parameter
            // Add more parameters here if needed
        },
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
        }
    })
    .then(response => {
        // Handle successful response
        console.log('Response received');
        res.send(response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error fetching data from Yelp API:', error);
        res.status(500).send('Error fetching data from Yelp API');
    });
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});