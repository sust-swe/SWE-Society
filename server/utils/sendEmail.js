const e = require('express');
const nodemailer = require('nodemailer');

 
const sendEmail = (userEmail, subj,  message)=>{

  
    const transport = nodemailer.createTransport(
        {
            service:'gmail',
            auth : {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        }
    );
    console.log(userEmail,subj,message);
    const mailOptions = {
        from : process.env.EMAIL_USER,
        to : userEmail,
        subject : subj,
        html : message
    };
    
    transport.sendMail(mailOptions)
    .then((res)=>console.log('Email Sent!'))
    .catch((err)=>console.log(err));
}

module.exports = sendEmail;
