'use strict';

// Imports
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const workExpRoutes = require('./routes/workExpRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const gallaryRoutes = require('./routes/gallaryRoutes');
const committeeRoutes = require('./routes/committeRoutes');
const roleRoutes = require('./routes/roleRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const xssClean = require('xss-clean');
const compression = require('compression');
const AppError = require('./utils/appError');

const association = require('./association/association');

// Creating the express app
const app = express();
require('dotenv').config();
// Security Middleware
app.use(helmet());
app.use(cors());

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
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/workExp', workExpRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/gallary', gallaryRoutes);
app.use('/api/committee/role', roleRoutes);
app.use('/api/committee', committeeRoutes);
app.get('/api/', (req, res) => {
  res.send('Hello');
});
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Register the routers
app.use(router);


// Using the errorHandler middleware
app.use(errorHandler);

// Exporting the app
module.exports = app;
