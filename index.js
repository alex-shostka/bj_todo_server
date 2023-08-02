require("dotenv").config();

const express = require("express");
const pool = require("./db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    // await sequelize.authenticate();
    // await sequelize.sync();
    pool.connect((err) => {
      if (err) throw err;
      console.log("Connect to PostgreSQL successfully!");
    });
    app.listen(PORT, () => console.warn(`Server started on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
