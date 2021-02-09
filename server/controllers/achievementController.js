const catchAsync = require('./../utils/catchAsync');
const client = require('../db');
const Achievement = require('../models/AchievementModel');
const AppError = require('../utils/appError');


exports.getAllAchievement = catchAsync(async (req, res, next) => {
    const achievements = await Achievement.findAll({ where: { hidden: "false" } });
    res.status(200).json(achievements);
});

exports.getSingleAchievement = catchAsync(async (req, res, next) => {
    const achievement = await Achievement.findOne({ where: { id: req.params.id, hidden: "false" } })
    res.status(200).json(achievement);
});

exports.getSpecificUserAchievements = catchAsync(async (req, res, next) => {
    const achievements = await Achievement.findAll({ where: { reg_no: req.params.reg_no } });
    if (achievements == null)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json(achievements)
})

exports.addAchievement = catchAsync(async (req, res, next) => {
    req.body.reg_no = req.user.reg_no;
    const achievement = await Achievement.create(req.body);
    res.status(200).json(achievement);
});

exports.deleteAchievement = catchAsync(async (req, res, next) => {
    const achievement = await Achievement.destroy({ where: { id: req.params.id, reg_no: req.user.reg_no } })
    if (achievement == 0)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json({ message: "Successfully deleted", achievement });
});