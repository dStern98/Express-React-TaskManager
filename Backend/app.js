const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const taskRouter = require("./app/Routes/taskRoutes");
const { notFound } = require("./app/Middleware/taskMiddleware");
const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
} = require("./app/Config/config");

app = express();

//Routes & Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/tasks", taskRouter);
app.use(notFound);

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const port = process.env.PORT || 5000;

//Connect to MongoDB via Mongoose and start the App
const start = async () => {
  try {
    await mongoose.connect(mongoURI);
    app.listen(port, () => {
      console.log(`Express running on port ${port}...`);
    });
  } catch (error) {
    console.log("Error in making connection...");
    console.log(error);
  }
};

//To prevent a race condition, add a setTimout to delay app startup
setTimeout(() => start(), 3000);
