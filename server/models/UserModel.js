const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User =  sequelize.define('user', {
    reg_no:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },

    role:{
        type: DataTypes.STRING,
        defaultValue: "user"
    },

    name: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    batch: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING

    },
    fb_link: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    linkedin_link: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    git_link: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    date_of_birth: {
        type: DataTypes.DATE
    },
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    isStudent: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
  });


  module.exports = User;
