
const catchAsync = require('./../utils/catchAsync');
const formidabel = require("formidable");
const client = require('../db');
const fs = require('fs');
const path = require('path');


exports.getAllBlogs = catchAsync(async (req, res, next) => {

  let query;

  if (req.body.isApproved) {
    query = {
      text: `select * from blog where isapproved=${req.body.isApproved}`
    }
  } else {
    query = {
      text: 'select * from blog'
    }
  }


  const response = await client.query(query)
  res.send(response.rows);
});


exports.postBlog = catchAsync(async (req, res, next) => {

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
      console.log(fieldName + ': ' + fieldValue);
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

exports.getOneBlog = catchAsync(async (req, res, next) => {
  const id = req.params.blog_id;
  const query = {
    text: `SELECT * FROM blog WHERE blog_id=${id};`
  }
  const response = await client.query(query);
  res.send(response.rows);
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const id = req.params.blog_id;

  const query = {
    text: `UPDATE blog SET title = '${req.body.title}', content= '${req.body.content}' WHERE blog_id =${id} RETURNING *;`
  }
  const response = await client.query(query);
  res.send(response.rows)
});

exports.approveBlog = catchAsync(async (req, res, next) => {
  const id = req.params.blog_id;
  await client.query(`UPDATE blog SET isapproved = 'true' WHERE blog_id =${id};`)
  res.send("Blog Approved");
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const id = req.params.blog_id;
  const response = await client.query(`DELETE FROM blog WHERE blog_id=${id};`);
  res.status(200).send('Successfull');
});

