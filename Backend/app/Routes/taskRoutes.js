const express = require("express");
const {getAllTasks, postTask, deleteTask, updateTask} = require("../Controllers/tasks");

//The Router for all basic CRUD Operations
const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);
taskRouter.post("/", postTask);
taskRouter.delete("/:objectID", deleteTask);
taskRouter.patch("/:objectID", updateTask);

module.exports = taskRouter;