const catchAsync = require('./../utils/catchAsync');
const Notice = require('../models/NoticeModel');
const AppError = require('../utils/appError');


exports.createNotice = catchAsync(async (req, res, next) => {
    console.log("hello")
    req.body.hidden = undefined;
    const notice = await Notice.create(req.body);
    res.status(200).json(notice);
});

exports.updateNotice = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    const notice = await Notice.update(req.body, { returning: true, where: { id: req.params.id } });
    if (notice[0] == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json(notice);
});

exports.deleteNotice = catchAsync(async (req, res, next) => {
    const notice = await Notice.update({ hidden: "true" }, { returning: true, where: { id: req.params.id } });
    if (notice)
        return next(new AppError(`Not found`, 404));
    res.status(200).json({ message: "Successfully deleted" });
});

exports.getAllNotices = catchAsync(async (req, res, next) => {
    const notices = await Notice.findAll({ where: { hidden: "false" } });
    res.status(200).json(notices);
})
