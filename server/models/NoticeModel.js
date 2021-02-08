const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Notice = sequelize.define('notice', {

    title: {
        type: DataTypes.STRING,
        allowNull: false
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



