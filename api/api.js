
// Base URL for the Storypath RESTful API
const API_BASE_URL = 'https://comp2140-fc6a3ae7.uqcloud.net/api';

// JWT token for authorization, replace with your actual token from My Grades in Blackboard
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.aLV-gl53pQbwE0Ausr4EVonEBqEtMfxiSm3_WDjhkhY';

/**
 * Helper function to handle API requests.
 * It sets the Authorization token and optionally includes the request body.
 * 
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} [method='GET'] - The HTTP method to use (GET, POST, PATCH).
 * @param {object} [body=null] - The request body to send, typically for POST or PATCH.
 * @returns {Promise<object>} - The JSON response from the API.
 * @throws Will throw an error if the HTTP response is not OK.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method, // Set the HTTP method (GET, POST, PATCH)
    headers: {
      'Content-Type': 'application/json', // Indicate that we are sending JSON data
      'Authorization': `Bearer ${JWT_TOKEN}` // Include the JWT token for authentication
    },
  };

  // If the method is POST or PATCH, we want the response to include the full representation
  if (method === 'POST' || method === 'PATCH') {
    options.headers['Prefer'] = 'return=representation';
  }

  // If a body is provided, add it to the request and include the username
  if (body) {
    options.body = JSON.stringify({ ...body});
  }

  // Make the API request and check if the response is OK
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (response.status !== 204) {
    return response.json(); // Return the response as a JSON object
  } else {
    return {}; // Return an empty object for no content
  }

}

/**
 * Function to list all collections associated with the current user.
 *
 * @returns {Promise<Array>} - An array of project objects.
 */
export async function getCollections() {
  return apiRequest('/collection');
}

/**
 * Function to get a single collection by its ID.
 * The url is slightly different from usual RESTFul ...
 * See the operators section https://docs.postgrest.org/en/v12/references/api/tables_views.html
 * @param {string} id - The ID of the collection to retrieve.
 * @returns {Promise<object>} - The collection object matching the ID.
 */
export async function getCollection(id) {
  return apiRequest(`/collection?id=eq.${id}`);
}

/**
 * Function to create a new collection.
 */
export async function createCollection(collection) {
  return apiRequest('/collection', 'POST', collection);
}

/**
 * Function to edit the parameters of a collection.
 */
export async function editCollection(id, updated_collection) {
  // Ensure the 'id' is part of the updated collection object
  const collectionWithId = { ...updated_collection, id };
  return apiRequest(`/collection?id=eq.${id}`, 'PUT', collectionWithId);
}

/**
 * Function to delete a collection.
 */
export async function deleteCollection(id) {
  return apiRequest(`/collection?id=eq.${id}`, 'DELETE');
}

/**
 * Function to list all cards associated with the current user.
 *
 * @returns {Promise<Array>} - An array of card objects.
 */
export async function getCards() {
  return apiRequest('/card');
}

/**
 * Function to get a single collection by its ID.
 * The url is slightly different from usual RESTFul ...
 * See the operators section https://docs.postgrest.org/en/v12/references/api/tables_views.html
 * @param {string} id - The ID of the card to retrieve.
 * @returns {Promise<object>} - The card object matching the ID.
 */
export async function getCard(id) {
  return apiRequest(`/card?id=eq.${id}`);
}

export async function createCard(card) {
  return apiRequest('/card', 'POST', card);
}

/**
 * Function to edit the parameters of a card.
 */
export async function editCard(id, updated_card) {
  const cardWithId = { ...updated_card, id };
  return apiRequest(`/card?id=eq.${id}`, 'PUT', cardWithId);
}

/**
 * Function to delete a card.
 */
export async function deleteCard(id) {
  return apiRequest(`/card?id=eq.${id}`, 'DELETE');
}

/**
 * Main function to demonstrate API usage.
 *
 * Creates a new project, lists all projects, and retrieves a single project by ID.
 */
async function main() {

}

// Execute the main function
main();
