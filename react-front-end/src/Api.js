// api.js

// Define your base API URL here
const BASE_URL = 'http://127.0.0.1:5000/api'; // Replace with your actual base URL

// Function to construct a full API URL
export function createApiUrl(endpoint) {
  return `${BASE_URL}/${endpoint}`;
}
