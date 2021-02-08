const catchAsync = require('./../utils/catchAsync');
const Notice = require('../models/NoticeModel');
const AppError = require('../utils/appError');


exports.createNotice = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    const Notice = await Notice.create(req.body);
    res.status(200).json(Notice);
});

exports.updateNotice = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    const Notice = await Notice.update(req.body, { returning: true, where: { id: req.params.id } });
    if (Notice[0] == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json(Notice);
});

exports.deleteNotice = catchAsync(async (req, res, next) => {
    const Notice = await Notice.update({ hidden: "true" }, { returning: true, where: { id: req.params.id } });
    if (Notice)
        return next(new AppError(`Not found`, 404));
    res.status(200).json({ message: "Successfully deleted" });
});

exports.getAllNotices = catchAsync(async (req, res, next) => {
    const Notices = await Notice.findAll({ where: { hidden: "false" } });
    res.status(200).json(Notices);
})
