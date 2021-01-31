const catchAsync = require('../utils/catchAsync');
const WorkExperience = require('../models/WorkExperienceModel');
const AppError = require('../utils/appError');

exports.addWorkExp = catchAsync(async (req, res, next) => {

    req.body.reg_no = req.user.reg_no;
    const workExp = await WorkExperience.create(req.body);
    res.status(200).json(workExp);
});

exports.updateWork = catchAsync(async (req, res, next) => {

    let workExp = await WorkExperience.findOne({ where: { id: req.params.id, reg_no: req.user.reg_no } });

    if (req.user.reg_no != workExp.reg_no)
        return next(new AppError(`Not allowed to perform this action`, 403));

    if (workExp == null)
        return next(new AppError(`WorkExperience does not exist for this blog`, 404));

    workExp = await WorkExperience.update(req.body, { returning: true, where: { id: req.params.id, reg_no: req.user.reg_no } });

    res.status(200).json(workExp[1][0]);
});

exports.deleteWork = catchAsync(async (req, res, next) => {
    const workExp = await WorkExperience.findOne({ where: { id: req.params.id, reg_no: req.user.reg_no } });

    if (workExp == null)
        return next(new AppError(`WorkExperience not found`, 404));

    if (req.user.reg_no != workExp.reg_no)
        return next(new AppError(`Not allowed to perform this action`, 403));

    await WorkExperience.destroy({ where: { id: req.params.id, reg_no: req.user.reg_no } });

    res.status(200).json({
        message: "Successfully deleted"
    })
});

exports.getWorkExperiences = catchAsync(async (req, res, next) => {
    const reg_no = req.params.reg_no;
    const workExp = await WorkExperience.findAll({ where: { reg_no } });
    if (workExp.length == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json({
        status: 'success',
        workExp
    });
});