'use strict';

// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to get all users
const getUser = catchAsync(async (req, res, next) => {
 // const users = await UserModel.find();
  res.status(200).json({
    status: 'success',
    data: 'user',
  });
});

// Function to sign up a user
const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
});


module.exports = { signUp, getUser };
