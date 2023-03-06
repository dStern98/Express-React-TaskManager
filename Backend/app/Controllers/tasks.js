const tasks = require("../Models/taskSchemas");

//The following 4 methods constitute the CRUD operations available.
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await tasks.find({});
    res.status(200).json({ Tasks: allTasks });
  } catch (error) {
    res.status(400).send(error);
  }
};

const postTask = async (req, res) => {
  const jsonBody = req.body;
  if (!jsonBody) {
    res
      .status(400)
      .json({ Message: "A JSON body is required for this endpoint." });
  }
  try {
    const newTask = await tasks.create(jsonBody);
    res.status(201).json({ Message: "Successfully created new task." });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteTask = async (req, res) => {
  const { objectID } = req.params;
  if (!objectID) {
    res.status(400).json({ Message: "You must provide the ID in the path" });
  }
  try {
    const deletedDocument = await tasks.findByIdAndDelete(objectID);

    if (!deletedDocument) {
      return res.status(404).send("No document matched the given ObjectID");
    }
    res
      .status(200)
      .json({
        Message: "Successfully deleted the following document",
        Document: deletedDocument,
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateTask = async (req, res) => {
  const { objectID } = req.params;
  if (!objectID) {
    return res
      .status(400)
      .json({ Message: "You must provide the ID in the path" });
  }
  try {
    const updatedDocument = await tasks.findByIdAndUpdate(objectID, req.body, {
      runValidators: true,
      returnDocument: "after",
    });
    if (!updatedDocument) {
      return res.status(404).send("No document matched the given ObjectID");
    }
    res
      .status(200)
      .json({
        Message: "Successfully updated the following document.",
        "Document with Changes": updatedDocument,
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getAllTasks, postTask, deleteTask, updateTask };
