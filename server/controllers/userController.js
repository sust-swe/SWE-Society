'use strict';

// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client = require("../db");

// Function to get all users
exports.getAllUser = catchAsync(async (req, res, next) => {
  const query = {
    text: 'Select reg_no, name, batch, image, fb_link, linkedin_link, git_link, phone, email, date_of_birth from member'
  }
  const result = await client.query(query);
  if (result.rows.length == 0)
    next(new AppError(`No user found!`, 404));
  res.json(result.rows)
});


exports.getSingleUser = catchAsync(async (req, res, next) => {
  const reg_no = req.params.reg_no;
  const query = {
    text: `select reg_no, name, batch, image, fb_link, linkedin_link, git_link, phone, email, date_of_birth from member where reg_no=${reg_no};`
  }

  const result = await client.query(query);
  if (result.rows.length == 0)
    next(new AppError(`User with Registration number : ${reg_no} not found!`, 404));
  res.json(result.rows[0]);
});
//updateuser has bugs
exports.updateUser = catchAsync(async (req, res, next) => {
  const reg_no = req.user.reg_no;

  const query = {
    text: `Update member set fb_link='${req.body.fb_link}', linkedin_link='${req.body.linkedin_link}', git_link='${req.body.git_link}', phone='${req.body.phone}',
    date_of_birth='${req.body.date_of_birth}' where reg_no=${reg_no} RETURNING *;`
  }

  const result = await client.query(query);
  res.json(result.rows[0]);
});

