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
  res.send(result.rows)
});

// Function to sign up a user
exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
});

exports.getSinleUser = catchAsync(async(req, res, next) => {
  const reg_no = req.params.reg_no;
  const query = {
    text: `select reg_no, name, batch, image, fb_link, linkedin_link, git_link, phone, email, date_of_birth from member where reg_no=${reg_no};`
  }

  const result = await client.query(query);
  res.send(result.rows);
});

exports.updateUser = catchAsync(async(req, res, next) => {
  const reg_no = req.params.reg_no;
  
  const query = {
    text: `Update member set fb_link='${req.body.fb_link}', linkedin_link='${req.body.linkedin_link}', git_link='${req.body.git_link}', phone='${req.body.phone}',
    date_of_birth='${req.body.date_of_birth}', skills=${req.body.skills} where reg_no=${reg_no};`
  }

  const result = await client.query(query);
  res.send("Successfully updated");
});

