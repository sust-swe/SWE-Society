const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const formidabel = require("formidable");
const { response } = require('express');
const { notify } = require('../routes/blogRoutes');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../utils/sendEmail');
const User = require('../models/UserModel');
const Credential = require('../models/CredentialModel');


exports.register = catchAsync(async (req, res, next) => {
  const { email, reg_no, name } = req.body;
  let user = await User.findAll({
    where: {
      reg_no
    }
  });
  if (user.length)
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
  //  const last_password_changed_at = new Date().toUTCString();
  user = await User.create({
    name,
    reg_no,
    batch,
  });
  credential = await Credential.create({
    reg_no,
    email,
    password
  });
  // console.log(user);
  res.json({
    pass: randompassword,
    hpass: password
  });
});


exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Credential.findAll({
    where: {
      email
    }
  });
  if (user.length == 0)
    return res.status(401).json("Invalid Email");
  const validPass = await bcrypt.compare(password, user[0].dataValues.password);
  if (!validPass)
    return res.status(401).json("Wrong Password");
  const jwtToken = jwtGenerator(user[0].dataValues.reg_no, process.env.jwtSessionTokenExpire);
  return res.json({ token: jwtToken });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const { email } = req.body;
  const user = await Credential.findAll({
    where: {
      email
    }
  });
  if (user.length == 0)
    return res.status(401).json("No user found");

  const password = generator.generate({
    length: 10,
    numbers: true
  });
  const jwtToken = jwtGenerator(user[0].dataValues.reg_no, process.env.jwtResetTokenExpire);
  const url = `https://localhost:8000/resetpassword/${jwtToken}`;
  const message = `<h3>Hey ${user[0].dataValues.name},Click here and reset your password within 5 minutes</h3>
                    <p>${url}</p>`;
  sendEmail(email, 'Reset Password', message);
  res.send("Reset Token Sent to email");
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const token = req.params.token;
  const decoded = await promisify(jwt.verify)(token, process.env.jwtSecret);
  const reg_no = decoded.user.id;
  console.log(reg_no);
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  //const now = new Date().toUTCString();
  await Credential.update({ password },
    {
      where: { reg_no }
    }
  );
  res.send("Password Resetted");
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { oldPass, newPass } = req.body;
  const user = await Credential.findAll({
    where: {
      reg_no: req.user.reg_no
    }
  });
  const realPass = user[0].dataValues.password;
  const truePass = await bcrypt.compare(oldPass, realPass);
  if (!truePass)
    return res.status(401).json("Wrong Password");
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(newPass, salt);
  await Credential.update({ password },
    {
      where: { reg_no: req.user.reg_no }
    }
  );
  const jwtToken = jwtGenerator(req.user.reg_no, process.env.jwtSessionTokenExpire);
  return res.json({ token: jwtToken });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];
  if (!token)
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.jwtSecret);
  const currentUser = decoded.user;
  // 3) Check if user still exists
  console.log("helo", currentUser.id);
  const user = await Credential.findAll({
    where: {
      reg_no: currentUser.id
    }
  })
  if (user.length == 0)
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  const changedTimestamp = parseInt(user[0].dataValues.updatedAt / 1000, 10);
  if (changedTimestamp > decoded.iat)
    return next(new AppError('Your password changed recently.Please log in again', 401));

  console.log(changedTimestamp, decoded.iat);
  req.user = {
    reg_no: user[0].dataValues.reg_no,
    role: user[0].dataValues.role
  };
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'moderator']
    if (!roles.includes(req.user.role))
      return next(new AppError('You do not have permission to perform this action', 403));
    next();
  };
};