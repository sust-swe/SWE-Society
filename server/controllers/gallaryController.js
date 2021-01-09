const catchAsync = require('./../utils/catchAsync');
const client = require('../db');


exports.addContent = catchAsync(async(req, res, next) => {
    const query = {
        text: `Insert Into gallary(imageurl, date, caption)
        VALUES('${req.body.imageurl}', '${req.body.date}', '${req.body.caption}') RETURNING *`
    }

    const result = await client.query(query);

    res.send(result.rows);
});

exports.deleteContent = catchAsync(async(req, res, next) => {
    const result = await client.query(`Delete From gallary where image_id=${req.params.id};`);
    res.send("Succefully deleted");
});

exports.updateContent = catchAsync(async(req, res , next) => {
    const result = await client.query(`Update gallary set caption='${req.body.caption}' where image_id = ${req.params.id} RETURNING *;`);
    res.send(result.rows);
});

exports.getALLContent = catchAsync(async(req, res, next) => {
    const result = await client.query('Select * From gallary;');
    res.send(result.rows);
});

exports.getSingleContent = catchAsync(async(req, res, next) => {
    const result = await client.query(`Select * From gallary where image_id=${req.params.id};`);
    res.send(result.rows);
});