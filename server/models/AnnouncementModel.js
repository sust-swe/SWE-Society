const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Announcement = sequelize.define('announcement', {

    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }


});

module.exports = Announcement;



