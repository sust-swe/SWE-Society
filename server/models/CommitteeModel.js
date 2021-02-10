const connection = require('../db');
const DataTypes = require('sequelize');

const Committee = connection.define('committee', {
    committee_order: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    session: {
        type: DataTypes.RANGE(DataTypes.INTEGER),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    end_date: {
        type: DataTypes.DATE
    }
});

module.exports = Committee;