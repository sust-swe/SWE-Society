const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Education = sequelize.define('education', {

    degree: {
        type: DataTypes.STRING,
        allowNull: false
    },
    institute: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    subject: {
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

module.exports = Education;
