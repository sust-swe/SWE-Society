const catchAsync = require('./../utils/catchAsync');
const client = require('../db');
const Gallary = require('../models/GallaryModel');
const AppError = require('../utils/appError');


exports.addContent = catchAsync(async(req, res, next) => {
    const content = await Gallary.create(req.body);
    res.status(200).json(content);
});

exports.deleteContent = catchAsync(async(req, res, next) => {
    const result = await Gallary.destroy({where: {id: req.params.id}});

    if(!result)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json({message: "Succefully deleted"});
});

exports.updateContent = catchAsync(async(req, res , next) => {
    const content = await Gallary.update(req.body,{returning: true,where: {id: req.params.id}})
    if(content[0] == 0)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json(content);
});

exports.getALLContent = catchAsync(async(req, res, next) => {
    const contents = await Gallary.findAll();
    if(contents == null)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json(contents);
});

exports.getSingleContent = catchAsync(async(req, res, next) => {
    const content = await Gallary.findOne({where: {id: req.params.id}});
    if(content == null)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json(content);
});