const catchAsync = require('./../utils/catchAsync');
const Event = require('../models/EventModel');
const AppError = require('../utils/appError');


exports.createEvent = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    const event = await Event.create(req.body);
    res.status(200).json(event);
});

exports.updateEvent = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    const event = await Event.update(req.body, { returning: true, where: { id: req.params.id, hidden: "false" } });
    if (event[0] == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json(event[1][0]);
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
    const event = await Event.update({ hidden: "true" }, { returning: true, where: { id: req.params.id } });
    if (event[0] == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json({ message: "Successfully deleted" });
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
    const events = await Event.findAll({ where: { hidden: "false" } });
    res.status(200).json(events);
});

exports.getEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findOne({ where: { id: req.params.id, hidden: "false" } });
    if (event == null)
        return next(new AppError(`Not found`, 404));
    res.status(200).json(event);
})
