'use strict';
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/UserModel');
const Credential = require('../models/CredentialModel');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const sendEmail = require('./../utils/sendEmail');
const Education = require('../models/EducationModel');
const WorkExperience = require('../models/WorkExperienceModel');
const Sequelize = require('sequelize');


exports.registerUser = catchAsync(async (req, res, next) => {
  const Op = Sequelize.Op;
  const { email, reg_no, name } = req.body;
  let user = await Credential.findOne({
    where: {
      [Op.or]: [{ reg_no }, { email }]
    }
  });
  if (user)
    return next(new AppError('User Already Exist!', 405));
  const randompassword = generator.generate({
    length: 10,
    numbers: true
  });
  const message = `<div>Hey ${name}, Your account is created for Swe Society.Your first time password is <h1>${randompassword}</h1><br> 
                          Please change this password after first login.</div>`;

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(randompassword, salt);
  const batch = reg_no.substring(0, 4);
  user = await User.create({ name, reg_no, batch });

  let er = false;
  await Credential.create({ reg_no, email, password }).catch(err => {
    User.destroy({ where: { reg_no } })
    er = true;
  });
  if (er)
    return next(new AppError('Not A Valid Email!', 405));

  sendEmail(email, 'Greetings from Swe Society', message);
  res.status(201).json({
    status: 'success',
    pass: randompassword,
    user
  });
});


exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({
    status: 'success',
    users
  });
});

exports.broadcastUser = catchAsync(async (req, res, next) => {
  const users = await Credential.findAll({ include: [User] });
  if (users.length == 0)
    next(new AppError(`No user found!`, 404));
  users.forEach((element) => {
    const message = `Dear ${element.user.name}, ${req.body.message}`;
    sendEmail(element.email, req.body.subject, message);
  });
  res.status(200).json({
    status: 'success'
  });
});


exports.getSingleUser = catchAsync(async (req, res, next) => {
  const reg_no = req.params.reg_no || req.user.reg_no;
  const user = await User.findOne({
    where: {
      reg_no
    }, include: [Credential, Education, WorkExperience],
  });
  if (user == null)
    return next(new AppError(`User with Registration number : ${reg_no} not found!`, 404));
  user.credential.password = undefined;
  res.status(200).json({
    status: 'success',
    user
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const reg_no = req.user.reg_no;
  const user = await User.update(req.body,
    {
      where: { reg_no },
      returning: true
    });
  res.status(200).json({
    status: 'success',
    user: user[1][0]
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const reg_no = req.params.reg_no;
  const user = await User.findOne({
    where: {
      reg_no
    }
  });
  if (user == null)
    return next(new AppError(`User does not exist`, 404));
  User.destroy({
    where: {
      reg_no
    }
  });
  res.status(200).json({
    status: 'success',
    message: 'User deleted'
  });
});

exports.setAdmin = catchAsync(async (req, res, next) => {
  const { role, reg_no } = req.body;
  let user = await User.findOne({
    where: {
      reg_no
    }
  });
  if (user == null)
    return next(new AppError(`User does not exist`, 404));
  user = await Credential.update({ role },
    {
      where: { reg_no },
      returning: true
    });
  res.status(200).json({
    status: 'success',
    message: `User has been made ${role}`
  });
});

exports.setStatus = catchAsync(async (req, res, next) => {
  const { status, reg_no } = req.body;
  let user = await User.findOne({
    where: {
      reg_no
    }
  });
  if (user == null)
    return next(new AppError(`User does not exist`, 404));
  user = await Credential.update({ status },
    {
      where: { reg_no },
      returning: true
    });
  res.status(200).json({
    status: 'success',
    message: `User has been made ${status}`
  });
});

exports.removeAdmin = catchAsync(async (req, res, next) => {
  const reg_no = req.params.reg_no;
  let user = await User.findOne({
    where: {
      reg_no
    }
  });
  if (user == null)
    return next(new AppError(`User does not exist`, 404));
  user = await Credential.update({ role: 'user' },
    {
      where: { reg_no },
      returning: true
    });
  res.status(200).json({
    status: 'success',
    message: `User with reg_no: ${reg_no} is removed from admin/superadmin`
  });
});


