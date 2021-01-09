const catchAsync = require('./../utils/catchAsync');
const client = require('../db');

exports.addWorkExp = catchAsync(async(req, res, next) => {

    const query = {
        text: `Insert INTO workexperiences (company_name, position, address, website_link, joining_date, description, user_id)
        VALUES('${req.body.company_name}', '${req.body.position}', '${req.body.address}', '${req.body.website_link}', '${req.body.joing_date}',
         '${req.body.description}', '${req.body.user_id}') RETURNING *;`
    }

    const result = await client.query(query);
    res.send(result.rows);
});

exports.leaveWork = catchAsync(async(req, res, next) => {
    const result = await client.query(`Update workexperiences set leaving_date='${req.body.leaving_date}' WHERE workexp_id=${req.params.workexp_id} RETURNING *;`);
    res.send(result.rows);
});

exports.deleteWork = catchAsync(async(req, res, next) => {
    const result = await client.query(`Delete from workexperiences where workexp_id=${req.params.workexp_id};`);
    res.send('Successfully deleted');
});