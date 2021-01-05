'use strict';

// Importing packages
const {Client} = require('pg')

// Confuguring the environment variables
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';


// Database Connection

console.log(process.env.DB_USER);
const client = new Client({
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  database:process.env_DB
})

client.connect()
.then(()=>console.log("Connected"))
.catch(e=>console.log(e))
.finally(()=>client.end())

// Importing the express app
const app = require('./app');

// Starting the server
const server = app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down the server...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
