const sequelize = require('../db');
const {DataTypes} = require('sequelize');



const Announcement =  sequelize.define('announcement', {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    }

  
});

module.exports = Announcement;


// CREATE TABLE announcements(
// 	announcement_id serial primary key,
// 	title VARCHAR(100) NOT NULL,
// 	content VARCHAR(500) NOT NULL,
// 	date Date NOT NULL,
// 	deadline Date NOT NULL,
// 	committee_order INT NOT NULL REFERENCES committees (committee_order)
// );

