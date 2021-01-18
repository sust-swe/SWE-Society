const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {

    name: {
        type: DataTypes.STRING,
        noUpdate: true
    },
    reg_no: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        validate: {
            is: /20[1-9][0-9]831[0-9][0-9][0-9]/i
        }

    },
    biography: {
        type: DataTypes.TEXT
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
    batch: {
        type: DataTypes.BIGINT,
        allowNull: false,
        noUpdate: true
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
    date_of_birth: {
        type: DataTypes.DATE,
        validate: {
            isAfter: "1950-12-30"
        }
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
