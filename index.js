// Import the Client class from the pg package
const { Client } = require('pg');
require('dotenv').config();

// Define your connection details
const connectionConfig = {
  user: process.env.POSTGRES_USER,        // e.g., 'postgres'
  host: process.env.POSTGRES_HOST,            // e.g., 'localhost'
  database: process.env.POSTGRES_DB,    // e.g., 'myapp'
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,                   // Default PostgreSQL port
};

// Create a new client instance
const client = new Client(connectionConfig);

// Use an async function to handle the asynchronous operations
async function runQuery() {
  try {
    // Step 1: Connect to the database
    await client.connect();
    console.log('Connected to PostgreSQL database!');

    // Step 2: Define your query
    const query = 'SELECT * FROM person WHERE id = $1;'; // $1 is a parameter placeholder
    const values = [3]; // Value for the placeholder

    // Step 3: Execute the query
    const result = await client.query(query, values);

    // Step 4: Work with the results
    // `result.rows` is an array of rows returned by the query
    console.log('Query result:');
    console.log(result.rows); // Logs all rows
    // console.log(result.rows[0]); // Logs the first row

  } catch (err) {
    // Handle any errors that occur during connection or query
    console.error('Error:', err.stack);
  } finally {
    // Step 5: Close the connection, whether the query succeeds or fails
    await client.end();
    console.log('Connection closed.');
  }
}

// Run the function
runQuery();