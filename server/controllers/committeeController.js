const catchAsync = require('./../utils/catchAsync');
const client = require('../db');


exports.createCommittee = catchAsync(async(req, res, next) => {
    console.log('I am in committee');
    const query = {
        text: `Insert Into committees(session, start_date, committee_order) VALUES('${req.body.session}', '${req.body.start_date}', ${req.body.committee_order})
        RETURNING *;`
    }

    const result = await client.query(query);
    res.send(result.rows);
});

exports.getSingleCommittee = catchAsync(async(req, res, next) => {
    const result = await client.query(`Select * From committees Where committee_order=${req.params.id}`);
    res.send(result.rows);
});

exports.updateCommittee = catchAsync(async(req, res, next ) => {
    let query;
    if(req.body.end_date){
         query = {
            text: `Update committees set session='${req.body.session}', start_date='${req.body.start_date}', committee_order=${req.body.committee_order},
            end_date='${req.body.end_date}' RETURNING *`
        }
    }else{
         query = {
            text: `Update committees set session='${req.body.session}', start_date='${req.body.start_date}', committee_order=${req.body.committee_order} RETURNING *`
        }
    }


    const result = await client.query(query);
    res.send(result.rows);
});


