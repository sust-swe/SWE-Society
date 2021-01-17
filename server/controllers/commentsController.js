const catchAsync = require('./../utils/catchAsync');
const Comment = require('../models/CommentModel');
const Blog = require('../models/BlogModel');

exports.postComment = catchAsync(async (req, res, next) => {
    const result = await Comment.create(req.body);
    res.status(200).json(result);
});


exports.UpdateComment = catchAsync(async (req, res, next) => {
    const result = await Comment.update(req.body, { where: { id: req.params.id } })
    res.send(result);
});

exports.deleteComment = catchAsync(async (req, res, next) => {

    const result = await Comment.findOne({ where: { id: req.params.id } });

    if (result == null)
        return next(new AppError(`Comment does not exist`, 404));
    await Comment.destroy({ where: { id: req.params.id } });

    res.status(200).json({
        status: 'success',
        message: 'Comment deleted'
    });
});

exports.getCommentsOfBlog = catchAsync(async (req, res, next) => {
    const comments = await Comment.findAll({ where: { blogId: req.params.blog_id }, inclue: [Blog] });
    
    if(comments == null)
        return next(new AppError(`Comment does not exist for this blog`, 404));

    res.status(200).json({
        status: 'success',
        comments
    });
})