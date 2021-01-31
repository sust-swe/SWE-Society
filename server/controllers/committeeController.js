const catchAsync = require('./../utils/catchAsync');
const client = require('../db');
const AppError = require('../utils/appError');
const Committee = require('../models/CommitteeModel');
const Role = require('../models/RoleModel');
const Announcement = require('../models/AnnouncementModel');

exports.createCommittee = catchAsync(async(req, res, next) => {
    const committee = await Committee.create(req.body);
    res.status(200).json(committee);
});

exports.getExecutiveMembersOfACommittee = catchAsync(async(req, res, next) => {
    const committee = await Committee.findOne({where: {committee_order: req.params.committee_order}, include: [Role, Announcement]});
    if(committee == null)
        return next(new AppError(`Not found`, 404));

    res.status(200).json(committee);
});

exports.updateCommittee = catchAsync(async(req, res, next ) => {
    const committee = await Committee.update(req.body,{returning: true,where: {committee_order: req.params.committee_order}})
    if(!committee[0])
        return next(new AppError(`Not found`, 404));
    res.status(200).json(committee);
});

exports.deleteCommittee = catchAsync(async(req, res, next) => {
    const committee = await Committee.destroy({where: {committee_order: req.params.committee_order}});
    if(committee == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json({message: "Successfully deleted"});
})


