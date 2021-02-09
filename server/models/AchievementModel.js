const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Achievement = sequelize.define('achievement', {

    team_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100)
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    image: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    team_member: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: false
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
