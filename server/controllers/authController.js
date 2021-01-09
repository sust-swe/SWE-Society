const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const formidabel = require("formidable");
const client = require('../db');
const { response } = require('express');
const { notify } = require('../routes/blogRoutes');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../utils/sendEmail');


exports.register = catchAsync(async (req, res, next) => {
    const {email,reg_no,name} = req.body;
    const user = await client.query(`SELECT * FROM member where reg_no=${reg_no};`);
    if(user.rows.length>0)
        return res.status(401).json("User Already Exist!");
    else
    {
        const password = generator.generate({
            length: 10,
            numbers: true
        });
        //send this password to the emaail of the new user
        const message = `<div>Hey ${name}, Your account is created for Swe Society.Your first time password is <h1>${password}</h1><br> 
                          Please change this password after first login.</div>`;
      
        sendEmail(email,'Greetings from Swe Society',message);
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password,salt);
        const batch = reg_no.substring(0, 4);
        const newUser = await client.query(
            `INSERT INTO member (name,email,password,reg_no,batch) VALUES 
            ('${name}','${email}','${bcryptPassword}',${reg_no},${batch}) RETURNING *;`
        );
       
        res.json({
            pass : password,
            hpass: bcryptPassword
        });
    }
  });
  

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await client.query(`SELECT * FROM member WHERE email='${email}';`);
    if(user.rows.length==0)
         return res.status(401).json("Invalid Email");
    const validPass= await bcrypt.compare(password,user.rows[0].password);
    if(!validPass)
        return res.status(401).json("Wrong Password");
   // console.log(user.rows[0].reg_no,process.env.jwtSessionTokenExpire);
    const jwtToken = jwtGenerator(user.rows[0].reg_no,process.env.jwtSessionTokenExpire);
    return res.json({token:jwtToken});
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.jwtSecret);
  
    // 3) Check if user still exists
    const currentUser = decoded.user;
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
    const user = await client.query(
        `SELECT reg_no,role FROM member WHERE reg_no = ${currentUser.id}`);
    req.user = user.rows[0];
    console.log(req.user);
    next();
  });

  exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      // roles ['admin', 'moderator']
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
      next();
    };
  };
  
  exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const {email} = req.body;
    const user = await client.query(`SELECT * FROM member WHERE email='${email}';`);
    if(user.rows.length==0)
         return res.status(401).json("No user found");

    const password = generator.generate({
        length: 10,
        numbers: true
    });
    const jwtToken = jwtGenerator(user.rows[0].reg_no,process.env.jwtResetTokenExpire);
    const url = `https://localhost:8000/resetpassword/${jwtToken}`;
    const message = `<h3>Hey ${user.rows[0].name},Click here and reset your password within 5 minutes</h3>
                    <p>${url}</p>`;
    sendEmail(email,'Reset Password',message);
    res.send("Reset Token Sent to email");
  });

  exports.resetPassword = catchAsync(async (req, res, next) => {
    const token = req.params.token;
    const decoded = await promisify(jwt.verify)(token, process.env.jwtSecret);
    const currentUser = decoded.user;
    console.log(currentUser);
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(req.body.password,salt);
    await client.query(`Update member set password='${bcryptPassword}' where reg_no=${currentUser.id}`);
    res.send("Password Resetted");
  
  });

  exports.updatePassword = catchAsync(async (req, res, next) => {
    const {oldPass,newPass} = req.body;
    console.log(oldPass,newPass,req.user);
    const user = await client.query(`SELECT password FROM member WHERE reg_no=${req.user.reg_no};`);
    const realPass = user.rows[0].password;
    const truePass= await bcrypt.compare(oldPass,realPass);
    if(!truePass)
         return res.status(401).json("Wrong Password");
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(newPass,salt);
    await client.query(`UPDATE member SET password = '${bcryptPassword}';`);
    const jwtToken = jwtGenerator(req.user.reg_no,process.env.jwtSessionTokenExpire);
    return res.json({token:jwtToken}); 
  });
  