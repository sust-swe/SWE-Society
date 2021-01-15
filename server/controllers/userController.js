'use strict';
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/UserModel');
const Credential = require('../models/CredentialModel');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const sendEmail = require('./../utils/sendEmail');


exports.registerUser = catchAsync(async (req, res, next) => {
  const { email, reg_no, name } = req.body;
  let user = await User.findOne({
    where: {
      reg_no
    }
  });
  if (user)
    return res.status(401).json("User Already Exist!");
  const randompassword = generator.generate({
    length: 10,
    numbers: true
  });
  const message = `<div>Hey ${name}, Your account is created for Swe Society.Your first time password is <h1>${randompassword}</h1><br> 
                          Please change this password after first login.</div>`;

  sendEmail(email, 'Greetings from Swe Society', message);
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(randompassword, salt);
  const batch = reg_no.substring(0, 4);
  user = await User.create({
    name,
    reg_no,
    batch,
  });
  const credential = await Credential.create({
    reg_no,
    email,
    password
  });
  res.json({
    pass: randompassword,
    hpass: password
  });
});


exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Credential.findOne({
    where: {
      email
    }
  });
  if (user == null)
    return res.status(401).json("Invalid Email");
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(401).json("Wrong Password");
  const jwtToken = jwtGenerator({ reg_no: user.reg_no }, process.env.jwtSessionTokenExpire);
  return res.json({ token: jwtToken });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.findAll();
  if (user.length == 0)
    next(new AppError(`No user found!`, 404));
  res.json(user);
});


exports.getSingleUser = catchAsync(async (req, res, next) => {
  const reg_no = req.params.reg_no;
  const user = await User.findOne({
    where: {
      reg_no
    }
  });
  if (user == null)
    next(new AppError(`User with Registration number : ${reg_no} not found!`, 404));
  res.json(user);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const reg_no = req.user.reg_no;
  const user = await User.update(req.body,
    {
      where: { reg_no },
      returning: true
    });
  res.json(user[1][0]);
});



