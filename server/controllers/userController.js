'use strict';

// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Function to get all users
exports.getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.findAll();
  if (user.length == 0)
    next(new AppError(`No user found!`, 404));
  res.json(user);
});


exports.getSingleUser = catchAsync(async (req, res, next) => {
  const reg_no = req.params.reg_no;
  const user = await User.findAll({
    where: {
      reg_no
    }
  });
  if (user.length == 0)
    next(new AppError(`User with Registration number : ${reg_no} not found!`, 404));
  res.json(user[0]);
});
//updateuser has bugs
exports.updateUser = catchAsync(async (req, res, next) => {
  const reg_no = req.user.reg_no;
  const user = await User.update(req.body,
    {
      where: { reg_no },
      returning: true
    });
  res.json(user[1][0]);
});
