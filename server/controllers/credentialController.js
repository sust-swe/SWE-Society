const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../utils/sendEmail');
const User = require('../models/UserModel');
const Credential = require('../models/CredentialModel');

const createSendToken = (req, res, user, message) => {

    const jwtToken = jwtGenerator({ reg_no: user.reg_no }, process.env.jwtSessionTokenExpire);

    res.cookie('jwt', jwtToken, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
        ),
        httpOnly: true
        //secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
    if (process.env.NODE_ENV === 'productin')
        cookieOptions.secure = true;
    user.password = undefined;

    // res.status(200).json({
    //     status: 'success',
    //     token: jwtToken,
    //     message,
    //     user
    // });
    res.status(200).json({
        status: 'success',
        message,
        user
    });

};

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Credential.findOne({
        where: {
            email
        },
        include: [User]
    });
    // console.log(user);
    if (user == null)
        return next(new AppError('Invalid Credential', 404));
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
        return next(new AppError('Invalid Credential', 404));
    createSendToken(req, res, user, 'Successfully Logged In!');
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await Credential.findOne({
        where: {
            email
        },
        include: [User]
    });
    if (user == null)
        return next(new AppError('No User Found!', 404));

    const password = generator.generate({
        length: 10,
        numbers: true
    });
    const jwtToken = jwtGenerator({ reg_no: user.user.reg_no }, process.env.jwtResetTokenExpire);
    const url = `https://localhost:8000/resetpassword/${jwtToken}`;
    const message = `<h3>Hey ${user.user.name},Click here and reset your password within 5 minutes</h3>
                    <p>${url}</p>`;
    sendEmail(email, 'Reset Password', message);
    res.status(200).json({
        status: 'success',
        message: 'Reset link sent to email!'
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const token = req.params.token;
    const decoded = await promisify(jwt.verify)(token, process.env.jwtSecret);
    const reg_no = decoded.user.reg_no;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    await Credential.update({ password },
        {
            where: { reg_no }
        }
    );
    res.status(200).json({
        status: 'success',
        message: 'Password Resetted'
    });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const { oldpassword, newpassword } = req.body;
    const user = await Credential.findOne({
        where: {
            reg_no: req.user.reg_no
        }
    });
    const realPass = user.password;
    const truePass = await bcrypt.compare(oldpassword, realPass);
    if (!truePass)
        return next(new AppError('Wrong Password', 401));
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newpassword, salt);
    await Credential.update({ password },
        {
            where: { reg_no: req.user.reg_no }
        }
    );
    createSendToken(req, res, req.user, 'Successfully Updated Password!');
});

exports.requestEmailChange = catchAsync(async (req, res, next) => {
    const jwtToken = jwtGenerator({ email: req.body.email }, process.env.jwtResetTokenExpire);
    const message = `<div>Hey,Use this token and update your email within 5 minutes.If this is not related to you just Ignore</div>
                    <p>${jwtToken}</p>`;
    sendEmail(req.body.email, 'Update Email', message);
    res.status(200).json({
        status: 'success',
        message: 'Email Update Token Sent to new email'
    });
});

exports.changeEmail = catchAsync(async (req, res, next) => {
    const { token, password } = req.body;
    const user = await Credential.findOne({
        where: {
            reg_no: req.user.reg_no
        }
    });
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
        return next(new AppError('Wrong Password', 401));
    const decoded = await promisify(jwt.verify)(token, process.env.jwtSecret);
    const email = decoded.user.email;
    await Credential.update({ email },
        {
            where: { reg_no: req.user.reg_no }
        }
    );
    res.status(200).json({
        status: 'success',
        message: 'Email Updated'
    });
});

