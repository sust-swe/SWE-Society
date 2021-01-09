'use strict';

// Imports
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const workExpRoutes = require('./routes/workExpRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const gallaryRoutes = require('./routes/gallaryRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const xssClean = require('xss-clean');
const compression = require('compression');

// Creating the express app
const app = express();
require('dotenv').config();
// Security Middleware
app.use(helmet());

// Compression Middleware
app.use(compression());

// Parsing JSON and Cookies
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Prevent XSS attacks
app.use(xssClean());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Testing a route
app.use('/blogs', blogRoutes);
app.use('/comments', commentsRoutes);
app.use('/user', userRoutes);
app.use('/workExp', workExpRoutes);
app.use('/achievements', achievementRoutes);
app.use('/gallary', gallaryRoutes);
app.get('/', (req, res) => {
  res.send('Hello');
});

// Register the routers
app.use(router);


// Using the errorHandler middleware
app.use(errorHandler);

// Exporting the app
module.exports = app;
