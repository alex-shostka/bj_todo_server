const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    dialectModule: require("pg"),
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  }
);
