const catchAsync = require('./../utils/catchAsync');
const client = require('../db');
const AppError = require('../utils/appError');
const Batch = require('../models/BatchModel');
const Role = require('../models/RoleModel');
const User = require('../models/UserModel');


exports.createBatch = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    const batch = await Batch.create(req.body);
    res.status(200).json(batch);
});

exports.getSpecificBatchsWithStudents = catchAsync(async (req, res, next) => {
    const batch = await Batch.findAll({
        where:
        {
            hidden: "false",
            batch: req.params.year
        },
        include: [
            {
                model: User,
                attributes: ['name', 'image', 'reg_no']
            }
        ]
    });
    if (batch == null)
        return next(new AppError(`Not found`, 404));
    res.status(200).json(batch[0]);
});
exports.getAllBatches = catchAsync(async (req, res, next) => {
    const batch = await Batch.findAll({
        where:
        {
            hidden: "false"
        }
    });
    if (batch == null)
        return next(new AppError(`Not found`, 404));
    res.status(200).json(batch);
});

exports.updateBatch = catchAsync(async (req, res, next) => {
    req.body.hidden = undefined;
    req.body.batch = undefined;
    const batch = await Batch.update(req.body, { returning: true, where: { batch: req.params.year } })
    if (!batch[0])
        return next(new AppError(`Not found`, 404));
    this.getAllBatches(req, res, next);
});


exports.deleteBatch = catchAsync(async (req, res, next) => {
    const result = await Batch.update({ hidden: "true" }, { returning: true, where: { batch: req.params.year } });
    if (result[0] == 0)
        return next(new AppError(`Does not found`, 404));
    res.status(200).json({ message: "Succefully deleted" });
});
