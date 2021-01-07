const catchAsync = require('./../utils/catchAsync');
const client = require('../db');

exports.postComment = catchAsync(async(req, res, next) => {
    const query = {
        text: 'INSERT INTO comments(content, date, user_id, blog_id) VALUES($1, $2, $3, $4 ) RETURNING *',
        values: [req.body.content, new Date() , req.body.user_id, req.body.blog_id],
    }
    const result = await client.query(query);
    res.send(result.rows);
});

exports.addReply = catchAsync(async(req, res, next) => {
    const query = {
        text: `Update comments Set replies =array_append(replies, '${req.body.reply}') where comment_id =${req.params.comment_id} RETURNING *;`
    }
    const result = await client.query(query);
    res.send(result.rows);
});

exports.UpdateComment = catchAsync(async(req, res, next) => {
    const result = await client.query(`Update comments Set content='${req.body.content}' where comment_id=${req.params.comment_id} RETURNING *;`);
    res.send(result.rows);
});

exports.deleteComment = catchAsync(async(req, res, next) => {
    const result = await client.query(`DELETE FROM comments WHERE comment_id=${req.params.comment_id};`);
    res.send('Successfully deleted');
});

exports.getAllComments = catchAsync(async(req, res, next) => {
    const result = await client.query(`SELECT * from comments where blog_id=${req.params.blog_id}`);
    res.send(result.rows);
})