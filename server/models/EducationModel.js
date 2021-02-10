const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Education = sequelize.define('education', {

    degree: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    institute: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    subject: {
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
        allowNull: false
    },
    leaving_date: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.STRING
    }

});

module.exports = Education;
