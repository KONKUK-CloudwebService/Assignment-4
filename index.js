const serverless = require("serverless-http"); // Lambda

const dotenv = require("dotenv");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config();

const dataSource = require("./models/appDataSource");
const routes = require("./routes");

// mysql
const initializeDataSource = async () => {
  try {
    await dataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error(`Initialize Error: ${error}`);
  }
};
initializeDataSource();

// mongoDB
mongoose
  .connect("mongodb://localhost:27017/assignment3")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(routes);
app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();

module.exports.handler = serverless(app);
