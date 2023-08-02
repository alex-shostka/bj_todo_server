const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    dialect: "postgres",
    dialectModule: require("pg"),
    host: process.env.DB_HOST,
    port: process.env.POSTGRES_HOST,
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  }
);
