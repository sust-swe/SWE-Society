
const catchAsync = require('./../utils/catchAsync');
const formidabel = require("formidable");
const Blog = require('../models/BlogModel');
const AppError = require('../utils/appError');
const Comment = require('../models/CommentModel');


exports.getAllNotApprovedBlogs = catchAsync(async (req, res, next) => {
  let result;
  if (req.user.role != 'admin' && req.user.role != 'superadmin')
    return next(new AppError(`Not allowed to perform this action`, 403));

  result = await Blog.findAll({ where: { isApproved: "false", hidden: "false" }, include: [Comment] });
  res.send(result);
});

exports.getAllApprovedBlogs = catchAsync(async (req, res, next) => {
  let result;
  result = await Blog.findAll({ where: { isApproved: "true", hidden: "false" }, include: [Comment] });
  res.send(result);
});


exports.postBlog = catchAsync(async (req, res, next) => {

  req.body.reg_no = req.user.reg_no;
  req.body.isApproved = undefined;
  req.body.hidden = undefined;
  const blog = await Blog.create(req.body)
  res.status(200).json(blog);
});


exports.getOneBlog = catchAsync(async (req, res, next) => {

  const blog = await Blog.findOne({ where: { id: req.params.id, hidden: "false", isApproved: "true" } });

  if (blog == null)
    return next(new AppError(`Blog Does Not found`, 404));

  res.status(200).json(blog);

});

exports.getSpecificUsersBlogs = catchAsync(async (req, res, next) => {

  const blogs = await Blog.findAll({ where: { reg_no: req.params.reg_no, hidden: "false", isApproved: "true" } });

  if (blogs == null)
    return next(new AppError(`Blog Does Not found`, 404));

  res.status(200).json(blogs);

});

exports.updateBlog = catchAsync(async (req, res, next) => {

  const blog = await Blog.findOne({ where: { id: req.params.id, hidden: "false", isApproved: "true" } });
  if (blog == null)
    return next(new AppError(`Blog Does Not found`, 404));

  if (req.user.reg_no != blog.reg_no)
    return next(new AppError(`Not allowed to perform this action`, 403));
  req.body.isApproved = undefined;
  req.body.hidden = undefined;
  blog = await Blog.update(req.body, { returning: true, where: { id: req.params.id } });

  res.status(200).json({ message: "Successfully updated", blog });
});

exports.approveBlog = catchAsync(async (req, res, next) => {

  const blog = await Blog.findOne({ where: { id: req.params.id, isApproved: "false" } });
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
  if (req.user.reg_no == blog.reg_no)
    await Blog.destroy({ where: { id: req.params.id } });
  else
    await Blog.update({ hidden: true }, { returning: true, where: { id: req.params.id } });


  res.status(200).json({
    status: 'success',
    message: 'Blog deleted successfully'
  });
});
