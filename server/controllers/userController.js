'use strict';

// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client = require("../db");

// Function to get all users
const getUser = catchAsync(async (req, res, next) => {
 // const users = await client.query('');
  res.status(200).json(users.rows);
});

// Function to sign up a user
const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
});


module.exports = { signUp, getUser };
