const catchAsync = require('./../utils/catchAsync');
const client = require('../db');

exports.addMemberToCommittee = catchAsync(async(req, res, next) => {
    const query = {
        text: `Insert Into roles(designation, user_id, committee_order) VALUES('${req.body.designation}', ${req.body.user_id}, ${req.body.committee_order}) RETURNING *;`
    }

    const result = await client.query(query);
    res.send(result.rows);
});

exports.removeMember = catchAsync(async(req, res , next) => {
    const result = await client.query(`Delete From roles where user_id=${req.body.user_id} and committee_order=${req.body.committee_order}`);
    res.send('Successfully deleted');
});

exports.getAllExecutiveMember = catchAsync(async(req, res, next) => {
    const result = await client.query(`Select * From roles Where committee_order=${req.body.committee_order}`);
    res.send(result.rows);
})