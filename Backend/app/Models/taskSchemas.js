const mongoose = require("mongoose");

//The Mongoose Schema for the Tasks

const taskSchema = new mongoose.Schema({
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    required: [true, "Priority is a required field."],
  },
  description: {
    type: String,
    required: [true, "Description is a required field."],
    maxlength: [100, "Description can not be more than 100 characters"],
  },
});

module.exports = mongoose.model("tasks", taskSchema);
