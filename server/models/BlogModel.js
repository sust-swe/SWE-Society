const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Blog = sequelize.define('blog', {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});


module.exports = Blog;
