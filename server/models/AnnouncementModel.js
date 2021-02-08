const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Announcement = sequelize.define('announcement', {

    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }


});

module.exports = Announcement;



