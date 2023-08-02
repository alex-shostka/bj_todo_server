const pool = require("../db");
const { DataTypes } = require("sequelize");

const User = pool.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "ADMIN" },
});

const Todo = pool.define("todo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  todotext: { type: DataTypes.STRING, allowNull: false },
  useremail: { type: DataTypes.STRING, allowNull: false },
  isComplete: { type: DataTypes.BOOLEAN, defaultValue: false },
  isChanged: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = {
  User,
  Todo,
};
