const catchAsync = require('./../utils/catchAsync');
const formidabel = require("formidable");
const client = require('../db');
const { response } = require('express');
const { notify } = require('../routes/blogRoutes');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');

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
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password,salt);
        const batch = reg_no.substring(0, 4);
        console.log(batch);
        const newUser = await client.query(
            `INSERT INTO member (name,email,password,reg_no,batch) VALUES ('${name}','${email}','${bcryptPassword}',${reg_no},${batch});`
        );
        res.json({
            pass : password,
            hpass: bcryptPassword
        });
    }
    
  
  });
  

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    // const user = await User.findOne({ email }).select('+password');
  
    // if (!user || !(await user.correctPassword(password, user.password))) {
    //   return next(new AppError('Incorrect email or password', 401));
    // }
  
    // 3) If everything ok, send token to client
    // createSendToken(user, 200, res);
    createSendToken(user, 200, res);
  });