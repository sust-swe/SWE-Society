const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Event = sequelize.define('event', {

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    description: {
        type: DataTypes.TEXT
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    cta_link: {
        type: DataTypes.STRING
    }

});

module.exports = Event;

