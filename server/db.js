
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    logging: console.log,
    define: {
      timestamps: true
    },
    dialect: 'postgres',
    timezone: 'utc'
  }
);


(async () => {
  try {
    await sequelize.authenticate();
<<<<<<< HEAD
    //await sequelize.sync({ force: true });
    //await sequelize.sync();
=======
    // await sequelize.sync({ force: true });
    // await sequelize.sync();
>>>>>>> b0706eca23f000b0f72cb2c4612a54eb5267f2f0
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();

module.exports = sequelize;
