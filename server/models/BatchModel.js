const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Batch = sequelize.define('batch', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    batch: {
        type: DataTypes.BIGINT,
        allowNull: false,
        noUpdate: true,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "batch.png"
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});


module.exports = Batch;
