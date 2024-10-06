const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', 'Zortepatsim4675#', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('MySQL Database is connected successfully');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  
module.exports = sequelize;
