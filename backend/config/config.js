require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'exploradoressemfronteiras',
    password: process.env.DB_PASS || 'exploradortec1234',
    database: process.env.DB_NAME || 'esf_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  }
};