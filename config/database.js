const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'uniplanner',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '12345678910',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);

module.exports = sequelize;
