const catchAsync = require('./../utils/catchAsync');
const client = require('../db');
const Achievement = require('../models/AchievementModel');
const AppError = require('../utils/appError');


exports.getAllAchievements = catchAsync(async (req, res, next) => {
    const achievements = await Achievement.findAll({ where: { hidden: "false" } });
    res.status(200).json(achievements);
});

exports.addAchievement = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    const achievement = await Achievement.create(req.body);
    res.status(200).json(achievement);
});

exports.updateAchievement = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    const achievement = await Achievement.update(req.body, { returning: true, where: { id: req.params.id, hidden: "false" } });
    if (achievement[0] == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json(achievement[1][0]);
});


exports.deleteAchievement = catchAsync(async (req, res, next) => {
    const achievement = await Achievement.update({ hidden: "true" }, { returning: true, where: { id: req.params.id } })
    if (achievement[0] == 0)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json({ message: "Successfully deleted" });
});