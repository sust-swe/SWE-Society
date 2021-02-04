const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Credential = sequelize.define('credential', {

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "student"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    }
});

module.exports = Credential;
