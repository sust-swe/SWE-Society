const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Event = sequelize.define('event', {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false
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

