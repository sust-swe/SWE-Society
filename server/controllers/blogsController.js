
const catchAsync = require('./../utils/catchAsync');
const formidabel = require("formidable");
const fs = require('fs');
const path = require('path');
const Blog = require('../models/BlogModel');
const AppError = require('../utils/appError');
const Comment = require('../models/CommentModel');


exports.getAllBlogs = catchAsync(async (req, res, next) => {

  let result;

  if (req.body.isApproved) {
    result = await Blog.findAll({ where: { isApproved: req.body.isApproved }, include: [Comment] });
  } else {
    result = await Blog.findAll({ include: [Comment] })

  }

  res.send(result);
});


exports.postBlog = catchAsync(async (req, res, next) => {

  req.body.reg_no = req.user.reg_no

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

  const blog = await Blog.create(req.body)
  res.status(200).json(blog);
});


exports.getOneBlog = catchAsync(async (req, res, next) => {

  const blog = await Blog.findOne({ where: { id: req.params.id } });

  if (blog == null)
    return next(new AppError(`Blog Does Not found`, 404));

  res.status(200).json(blog);

});

exports.getSpecificUsersBlogs = catchAsync(async (req, res, next) => {

  const blogs = await Blog.findAll({ where: { reg_no: req.params.reg_no } });

  if (blogs == null)
    return next(new AppError(`Blog Does Not found`, 404));

  res.status(200).json(blogs);

});

exports.updateBlog = catchAsync(async (req, res, next) => {

  const blog = await Blog.findOne({where: {id: req.params.id}});
  if (blog == null)
    return next(new AppError(`Blog Does Not found`, 404));

  if (req.user.reg_no != blog.reg_no )
    return next(new AppError(`Not allowed to perform this action`, 403));

  blog = await Blog.update(req.body, { returning: true, where: { id: req.params.id } });

  res.status(200).json({ message: "Successfully updated", blog });
});

exports.approveBlog = catchAsync(async (req, res, next) => {

  const blog = await Blog.findOne({where: {id: req.params.id}});
  if (blog == null)
    return next(new AppError(`Blog Does Not found`, 404));

  blog = await Blog.update({ isApproved: true }, { returning: true, where: { id: req.params.id } });

  res.status(200).json({
    message: "Successfully approved",
    blog
  });

});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ where: { id: req.params.id } });

  if (blog == null)
    return next(new AppError(`Blog does not exist`, 404));

  if (req.user.reg_no != blog.reg_no && req.user.role != 'admin' && req.user.role != 'superadmin')
    return next(new AppError(`Not allowed to perform this action`, 403));

  await Blog.destroy({ where: { id: req.params.id } });

  res.status(200).json({
    status: 'success',
    message: 'Blog deleted successfully'
  });
});
