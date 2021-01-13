const sequelize = require('../db');
const {DataTypes} = require('sequelize');



const Role =  sequelize.define('role', {
    designation:{
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  module.exports = Role;
