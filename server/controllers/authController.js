const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Credential = require('../models/CredentialModel');
const User = require('../models/UserModel')


exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];

  if (!token)
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  const decoded = await promisify(jwt.verify)(token, process.env.jwtSecret);
  const currentUser = decoded.user;
  console.log(currentUser);
  const user = await Credential.findOne({
    where: {
      reg_no: currentUser.reg_no
    }, include: [{
      model: User,
      attributes: ['name']
    }]
  })
  if (user == null)
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  const changedTimestamp = parseInt(user.updatedAt / 1000, 10);
  if (changedTimestamp > decoded.iat)
    return next(new AppError('Your credential changed recently.Please log in again', 401));

  //console.log(changedTimestamp, decoded.iat);
  req.user = {
    reg_no: user.reg_no,
    role: user.role,
    name: user.user.name
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