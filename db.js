const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    dialect: "postgres",
    dialectModule: require("pg"),
    dialectOptions: { ssl: {} },
    host: process.env.POSTGRES_HOST,
  }
);
