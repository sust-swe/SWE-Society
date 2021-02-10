const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const WorkExperience = sequelize.define('workExperience', {
    position: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    company: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    location: {
        type: DataTypes.STRING(50)
    },
    website_link: {
        type: DataTypes.STRING
    },
    joining_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    leaving_date: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.STRING
    }

});

module.exports = WorkExperience;
