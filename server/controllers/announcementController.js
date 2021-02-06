const catchAsync = require('./../utils/catchAsync');
const client = require('../db');
const Announcement = require('../models/AnnouncementModel');
const AppError = require('../utils/appError');


exports.createAnnouncement = catchAsync(async(req, res, next) => {
    const announcement = await Announcement.create(req.body);
    res.status(200).json(announcement);
});

exports.updateAnnouncement = catchAsync(async(req, res, next) => {
    const announcement = await Announcement.update(req.body, {returning: true, where: {id: req.params.id}});
    if(announcement[0] == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json(announcement);
});

exports.deleteAnnouncement = catchAsync(async(req, res, next) => {
    const announcement = await Announcement.destroy({where: {id: req.params.id}});
    if(announcement == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json({message: "Successfully deleted"});
});

exports.getAllAnnouncements = catchAsync(async(req, res, next) => {
    const announcements = await Announcement.findAll();
    res.status(200).json(announcements);
})
