const catchAsync = require('./../utils/catchAsync');
const client = require('../db');
const Gallary = require('../models/GallaryModel');
const AppError = require('../utils/appError');


exports.addContent = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    const content = await Gallary.create(req.body);
    res.status(200).json(content);
});

exports.deleteContent = catchAsync(async (req, res, next) => {
    const result = await Gallary.update({ hidden: "true" }, { returning: true, where: { id: req.params.id } });
    if (result[0] == 0)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json({ message: "Succefully deleted" });
});

exports.updateContent = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    const content = await Gallary.update(req.body, { returning: true, where: { id: req.params.id, hidden: "false" } })
    if (content[0] == 0)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json(content[1][0]);
});

exports.getALLContent = catchAsync(async (req, res, next) => {
    const contents = await Gallary.findAll({ where: { hidden: "false" } });
    if (contents == null)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json(contents);
});

exports.getSingleContent = catchAsync(async (req, res, next) => {
    const content = await Gallary.findOne({ where: { id: req.params.id, hidden: "false" } });
    if (content == null)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json(content);
});