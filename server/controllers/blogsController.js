
const catchAsync = require('./../utils/catchAsync');
const formidabel = require("formidable");
const client = require('../db');
const fs = require('fs');
const path = require('path'); 
const { response } = require('express');

exports.getAll = catchAsync(async(req, res , next) => {
    const query = {
        text: 'select * from blog'
    }

    client.query(query, (err, response) => {
      if(err){
        console.log(err.stack);
        res.send(err.stack);
      } else{
        console.log(response);
        res.send(response.rows);
      }
    });

});

exports.post = catchAsync(async(req, res , next) => {

    let formData = {};
  
    const prefixPath = "/../public/blog/";
    let filePath = "/blog/";
    new formidabel.IncomingForm()
      .parse(req)
      .on("fileBegin", (image, file) => {
        const randPath = file.path.split("_")[1] + "." + file.type.split("/")[1];
        file.path = __dirname + prefixPath + randPath;
        filePath += randPath;
      })
      .on("file", (name, file) => {
        formData[name] = filePath;
  
      })
  
    .on('field', (fieldName, fieldValue) => {
      console.log(fieldName+': '+fieldValue);
      formData[fieldName] = fieldValue;
      })
       
    .once('end', () => {
        const query = {
          text: 'INSERT INTO public."blog"(user_id, title, content, date, image) VALUES($1, $2, $3, $4, $5)',
          values: [formData.user_id, formData.title, formData.content, new Date(), [filePath]],
        }
        client.query(query, (err, response) => {
          if (err) {
            console.log(err.stack);
          } else {
            res.send('Successfully updated');
          }
        });
      });

});

exports.getOne = catchAsync(async(req, res , next) => {
    const id = req.params.blog_id;
    const query = {
      text : `SELECT * FROM blog WHERE blog_id=${id};`
    }
    const response= await client.query(query);
    res.send(response.rows);
});

exports.patch = catchAsync(async(req, res , next) => {
    const id = req.body.blogId;
});

exports.delete = catchAsync(async(req, res , next) => {
  const id = req.params.blog_id;
  const query = {
    text : `DELETE FROM blog WHERE blog_id=${id};`
  }
  const response= await client.query(query);
  res.status(200).send('Successfull');
});

