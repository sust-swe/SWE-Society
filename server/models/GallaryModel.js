const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Gallary = sequelize.define('gallary', {

    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caption: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});

module.exports = Gallary;
