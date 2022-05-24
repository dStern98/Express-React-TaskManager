const express = require("express");
const mongoose = require("mongoose");
const tasks = require('./Models/taskSchemas');
const connectDB = require("./DB/connectDB");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const taskRouter = require("./Routes/taskRoutes");
const {notFound} = require("./Middleware/taskMiddleware");


app = express();

//Routes & Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/tasks", taskRouter);
app.use(notFound);


const port = process.env.PORT || 5000;

//Connect to MongoDB via Mongoose and start the App
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Express running on port ${port}...`)
        })
    }
    catch (error) {
        console.log("Error in making connection...");
        console.log(error);
    }

}


start();


