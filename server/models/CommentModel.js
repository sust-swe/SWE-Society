const sequelize = require('../db');
const {DataTypes} = require('sequelize');



const Comment =  sequelize.define('comment', {

    content: {
        type: DataTypes.STRING,
        allowNull: false
    }

  
});

module.exports = Comment;

