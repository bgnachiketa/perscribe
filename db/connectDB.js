const {Sequelize,DataTypes} = require('sequelize');

module.exports = new Sequelize('doctor', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});




