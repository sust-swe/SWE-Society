const catchAsync = require('./../utils/catchAsync');
const client = require('../db');
const AppError = require('../utils/appError');
const Committee = require('../models/CommitteeModel');
const Role = require('../models/RoleModel');
const User = require('../models/UserModel');
const Announcement = require('../models/AnnouncementModel');

exports.createCommittee = catchAsync(async (req, res, next) => {
    const committee_order = await Committee.count() + 1;
    req.body.committee_order = committee_order;
    const committee = await Committee.create(req.body);
    res.status(200).json(committee);
});

exports.getExecutiveMembersOfACommittee = catchAsync(async (req, res, next) => {
    const committee = await Role.findAll({
        where:
        {
            committee_order: req.params.committee_order
        },
        include: [
            {
                model: User,
                attributes: ['name', 'image']
            },
            Committee
        ]
    });
    if (committee == null)
        return next(new AppError(`Not found`, 404));

    res.status(200).json(committee);
});

exports.getExecutiveMembersOfCurrentCommittee = catchAsync(async (req, res, next) => {
    const committee_order = await Committee.count();
    req.params.committee_order = committee_order;
    this.getExecutiveMembersOfACommittee(req, res, next);
});

exports.updateCommittee = catchAsync(async (req, res, next) => {
    const committee_order = await Committee.count();
    const committee = await Committee.update(req.body, { returning: true, where: { committee_order } })
    if (!committee[0])
        return next(new AppError(`Not found`, 404));
    res.status(200).json(committee[1][0]);
});

exports.getCommittees = catchAsync(async (req, res, next) => {
    const committee = await Committee.findAll();
    if (!committee)
        return next(new AppError(`Not found`, 404));
    res.status(200).json(committee);
});

//role

exports.addMemberToCommittee = catchAsync(async (req, res, next) => {
    const committee_order = await Committee.count();
    req.body.forEach((element) => {
        element.committee_order = committee_order
    });
    const role = await Role.bulkCreate(req.body);
    req.params.committee_order = committee_order;
    this.getExecutiveMembersOfACommittee(req, res, next);
    // res.status(200).json(role);
});

exports.removeMember = catchAsync(async (req, res, next) => {
    const committee_order = await Committee.count();
    const role = await Role.destroy({ where: { reg_no: req.params.reg_no, committee_order } });
    if (role == 0)
        return next(new AppError(`Not found`, 404));
    res.status(200).json({ message: 'Successfully deleted' });
});

exports.updateRole = catchAsync(async (req, res, next) => {
    const committee_order = await Committee.count();
    console.log(req.body.length);
    let response = [];
    for (let index = 0; index < req.body.length; index++) {
        const { reg_no, designation } = req.body[index];
        const role = await Role.update({ designation },
            {
                where: { reg_no, committee_order },
                returning: true,
            }).catch((err) => { console.log(err) });
        response.push(role[1][0]);
    }
    res.status(200).json(response);
})
