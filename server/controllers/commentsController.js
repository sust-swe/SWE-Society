const catchAsync = require('./../utils/catchAsync');
const Comment = require('../models/CommentModel');
const Blog = require('../models/BlogModel');
const AppError = require('../utils/appError');

exports.postComment = catchAsync(async (req, res, next) => {
    req.body.reg_no = req.user.reg_no;
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
});


exports.UpdateComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.update(req.body, { returning: true, where: { id: req.params.id } })
    if (!comment[0])
        return next(new AppError(`Comment Does Not found`, 404));

    res.status(200).json({
        message: "Successfully updated",
        comment
    });
});

exports.deleteComment = catchAsync(async (req, res, next) => {

    const comment = await Comment.findOne({ where: { id: req.params.id } });

    if (comment == null)
        return next(new AppError(`Comment does not exist`, 404));

    if (req.user.reg_no != comment.reg_no && req.user.role != 'admin' && req.user.role != 'superadmin')
        return next(new AppError(`Not allowed to perform this action`, 403));
    await Comment.destroy({ where: { id: req.params.id } });

    res.status(200).json({
        status: 'success',
        message: 'Comment deleted'
    });
});

exports.getCommentsOfBlog = catchAsync(async (req, res, next) => {
    const comments = await Comment.findAll({ where: { blog_id: req.params.blog_id }, include: [{ model: Blog }] });

    if (comments == null)
        return next(new AppError(`Comment does not exist for this blog`, 404));

    res.status(200).json({
        status: 'success',
        comments
    });
})