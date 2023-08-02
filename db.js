const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.POSTGRES_URL + "?sslmode=require",
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    dialect: "postgres",
    dialectModule: require("pg"),
    host: process.env.POSTGRES_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  }
);
