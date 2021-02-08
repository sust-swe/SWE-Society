const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Comment = sequelize.define('comment', {

    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Comment;

