const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const WorkExperience = sequelize.define('workExperience', {
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(50)
    },
    website_link: {
        type: DataTypes.STRING
    },
    joining_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    leaving_date: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.STRING
    }

});

module.exports = WorkExperience;
