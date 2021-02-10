const catchAsync = require('./../utils/catchAsync');
const Comment = require('../models/CommentModel');
const Blog = require('../models/BlogModel');
const AppError = require('../utils/appError');
const User = require('../models/UserModel');

exports.postComment = catchAsync(async (req, res, next) => {
    req.body.reg_no = req.user.reg_no;
    req.body.hidden = undefined;
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
});


exports.UpdateComment = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
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
    if (req.user.reg_no == comment.reg_no)
        await Comment.destroy({ where: { id: req.params.id } });
    else
        Comment.update({ hidden: true }, { returning: true, where: { id: req.params.id } });

    res.status(200).json({
        status: 'success',
        message: 'Comment deleted'
    });
});

exports.getCommentsOfBlog = catchAsync(async (req, res, next) => {
    console.log("HI");
    const comments = await Comment.findAll({
        where: { blog_id: req.params.blog_id, hidden: "false" }, include: [
            {
                model: User,
                attributes: ['name', 'image', 'reg_no']
            }
        ]
    });

    res.status(200).json({
        status: 'success',
        comments
    });
})