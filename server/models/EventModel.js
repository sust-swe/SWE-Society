const sequelize = require('../db');
const {DataTypes} = require('sequelize');



const Event =  sequelize.define('event', {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    image: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    description: {
        type: DataTypes.TEXT
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
    },
    cta_link: {
        type: DataTypes.STRING
    }
  
});

module.exports = Event;


// CREATE TABLE events(
// 	event_id serial primary key,
// 	title VARCHAR(100) NOT NULL,
// 	event_date Date NOT NULL,
// 	image_url text ,
// 	description VARCHAR(200),
// 	prority INT NOT NULL,
// 	cta_link text,
// 	committee_order INT NOT NULL REFERENCES committees (committee_order)
// );
