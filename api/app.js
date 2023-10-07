const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();

// Enable CORS for all routes
app.use(cors());

require('dotenv').config();

const port = process.env.PORT || 5000; // Use port 3000 by default

// Import your routes module here
const routes = require('./router');

// Use the routes in your app
app.use('/api', routes); // Mount the routes under the '/api' prefix

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
