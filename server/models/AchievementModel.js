const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Achievement = sequelize.define('achievement', {

    team_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    description: {
        type: DataTypes.STRING
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});

module.exports = Achievement;
