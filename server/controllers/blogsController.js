
const catchAsync = require('./../utils/catchAsync');
const formidabel = require("formidable");
const fs = require('fs');
const path = require('path');
const Blog = require('../models/BlogModel');


exports.getAllBlogs = catchAsync(async (req, res, next) => {

  let result;

  if (req.body.isApproved) {
    result = await Blog.findAll({
      where: {
        isApproved: req.body.isApproved
      }
    })
  } else {
    result = await Blog.findAll()
  }

  res.send(result);
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
      formData[fieldName] = fieldValue;
    })

    .once('end', () => {
      console.log("On End...");
    });

    const result = await Blog.create(req.body)
    res.send(result);
});

exports.getOneBlog = catchAsync(async (req, res, next) => {

  console.log(req.params.id);
  const result = await Blog.findAll({
    where: {
      id: req.params.id
    }
  });

  res.send(result);
});

exports.getSpecificUsersBlogs = catchAsync(async (req, res, next) => {

  console.log(req.params.id);
  const result = await Blog.findAll({
    where: {
      reg_no: req.params.reg_no
    }
  });

  res.send(result);
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const result = await Blog.update(req.body, { where: {id: req.params.id}})
  res.send(result);
});

exports.approveBlog = catchAsync(async (req, res, next) => {
  const result = await Blog.update({isApproved: true}, { where: { id: req.params.id}});
  res.send(result);
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const result = await Blog.destroy({where: {id: req.params.id}});
  res.status(200).send('Successfull');
});
