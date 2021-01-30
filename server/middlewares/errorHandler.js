'use strict';

const AppError = require('../utils/appError');

// Error response in development
const sendErrorDev = (err, res) => {
  res
    .status(err.statusCode)
    .json({ message: err.message, status: err.status, stack: err.stack, err });
};

// Error response in production
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ message: err.message, status: err.status });
  } else {
    res.status(500).json({ status: 'error', message: 'Something went wrong!' });
  }
};

// Sequelize Database error handlers
const handleSequelizeDatabaseError = err => {
  console.log(err);
  const message = err.message;
  return new AppError(message, 400);
};

const handleSequelizeUniqueConstraintError = err => {
  const message = err.errors[0].message;
  return new AppError(message, 400);
};

const handleSequelizeValidationError = err => {
  const message = err.message;
  return new AppError(message, 400);

};

// Handling JWT Errors
const handleJWTError = err => new AppError('Invalid token', 401);
const handleTokenExpiredError = err => new AppError('Token expired', 401);


const errorHandler = (err, req, res, next) => {
  //console.log(err.name);
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name == 'SequelizeDatabaseError') error = handleSequelizeDatabaseError(error);
    if (error.name == 'SequelizeUniqueConstraintError') error = handleSequelizeUniqueConstraintError(error);
    if (error.name == 'SequelizeValidationError') error = handleSequelizeValidationError(error);
    if (error.name == 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name == 'TokenExpiredError') error = handleTokenExpiredError(error);

    sendErrorProd(error, res);
  } else {
    sendErrorDev(err, res);
  }
};

module.exports = errorHandler;
