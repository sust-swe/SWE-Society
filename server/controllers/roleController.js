const catchAsync = require('./../utils/catchAsync');
const client = require('../db');
const Role = require('../models/RoleModel');
const AppError = require('../utils/appError');

exports.addMemberToCommittee = catchAsync(async(req, res, next) => {
    const role = await Role.create(req.body);
    res.status(200).json(role);
});

exports.removeMember = catchAsync(async(req, res , next) => {
    const role = await Role.destroy({where: {reg_no: req.body.reg_no , committee_order: req.body.committee_order}});
    if(role == 0)
        return next(new AppError(`Not found`, 404));
    
    res.status(200).json({message:'Successfully deleted'});
});

exports.updateRole = catchAsync(async(req, res, next) => {
    const role = await Role.update(req.body, {returning: true, where: {reg_no: req.body.reg_no, committee_order: req.body.committee_order}});
    if(role[0] == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json(role);
})
