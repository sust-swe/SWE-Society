const catchAsync = require('./../utils/catchAsync');
const client = require('../db');


exports.getAllAchievement = catchAsync(async(req, res, next) => {
    const result = await client.query(`Select * From achievements`);
    res.send(result.rows);
});

exports.getSingleAchievement = catchAsync(async(req, res, next) => {
    const result = await client.query(`Select * From achievements where achievement_id=${req.params.achievement_id}`);
    res.send(result.rows);
});

exports.getSpecificUserAchievements = catchAsync(async(req, res, next) => {
    const result = await client.query(`Select * From achievements where user_id=${req.params.user_id}`);
    res.send(result.rows);
})

exports.addAchievement = catchAsync(async(req, res , next) => {

    const query = {
        text: `INSERT INTO achievements(team_name, title, position, date, image_url, team_members, description, user_id)
        VALUES($1, $2, $3, $4, $5, $6,$7, $8) RETURNING * ;`,
        values: [req.body.team_name, req.body.title, req.body.position, req.body.date,req.body.image_url,
             req.body.team_members, req.body.description, req.body.user_id ]
    }
    const result = await client.query(query);
    res.send(result.rows);
});

exports.deleteAchievement = catchAsync(async(req, res, next) => {
    const result = await client.query(`Delete From achievements where achievement_id=${req.params.achievement_id};`);
    res.send("Successfully deleted");
});