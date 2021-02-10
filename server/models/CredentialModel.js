const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Credential = sequelize.define('credential', {

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    role: {
        type: DataTypes.STRING,
        defaultValue: "user",
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "student",
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    }
});

module.exports = Credential;
