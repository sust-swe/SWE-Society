const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Notice = sequelize.define('notice', {

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT
    },
    attachment: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Notice;



