'use strict';

// Importing packages
// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

// Confuguring the environment variables
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
const client = require("./db");


// Importing the express app
const app = require('./app');

// Starting the server
const server = app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down the server...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
