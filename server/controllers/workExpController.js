const catchAsync = require('./../utils/catchAsync');
const client = require('../db');
const WorkExpModel = require('../models/WorkExpModel');
const AppError = require('../utils/appError');

exports.addWorkExp = catchAsync(async (req, res, next) => {

    req.body.reg_no = req.user.reg_no;
    const workExp = await WorkExpModel.create(req.body);
    res.status(200).json(workExp);
});

exports.leaveWork = catchAsync(async (req, res, next) => {

    const workExp = await WorkExpModel.findOne({ where: { id: req.params.workexp_id, reg_no: req.user.reg_no } });

    if (req.user.reg_no != workExp.reg_no)
        return next(new AppError(`Not allowed to perform this action`, 403));

    if (workExp == null)
        return next(new AppError(`WorkExperience does not exist for this blog`, 404));

    workExp = await WorkExpModel.update({ leaving_date: Date.now() }, { returning: true, where: { id: req.params.workexp_id, reg_no: req.user.reg_no } });

    res.status(200).json(workExp);
});

exports.deleteWork = catchAsync(async (req, res, next) => {
    const workExp = await WorkExpModel.findOne({ where: { id: req.params.workexp_id, reg_no: req.user.reg_no } });

    if (workExp == null)
        return next(new AppError(`WorkExperience not found`, 404));

    if (req.user.reg_no != workExp.reg_no)
        return next(new AppError(`Not allowed to perform this action`, 403));
    
    await WorkExpModel.destroy({where: {id: req.params.workexp_id, reg_no: req.user.reg_no}});

    res.status(200).json({
        message: "Successfully deleted"
    })
});