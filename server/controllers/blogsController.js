
const catchAsync = require('./../utils/catchAsync');


exports.getAll = catchAsync(async(req, res , next) => {
    console.log('GET all...');
    res.send('Hello2');
});

exports.post = catchAsync(async(req, res , next) => {

});

exports.getOne = catchAsync(async(req, res , next) => {
    const id = req.params.blogId;
});

exports.patch = catchAsync(async(req, res , next) => {
    const id = req.body.blogId;
});

exports.delete = catchAsync(async(req, res , next) => {
    const id = req.body.blogId;
});

