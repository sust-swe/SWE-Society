const sequelize = require('../db');
const { DataTypes } = require('sequelize');



const Role = sequelize.define('role', {
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    reg_no: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    committee_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Role;
