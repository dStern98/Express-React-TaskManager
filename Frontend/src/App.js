import React, { useState, useEffect } from "react";
import { SearchBox } from "./Components/SearchBox";
import { TasksList } from "./Components/TasksList";
import { metadata } from "./metadata";
const baseURL = metadata.baseURL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [editID, setEditID] = useState(null);

  const deleteTask = async (objectID) => {
    try {
      const response = await fetch(`${baseURL}${objectID}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getTasks();
      } else {
        console.log("An Error occurred...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch(baseURL);
      if (response.ok) {
        const responseJSON = await response.json();
        setTasks(responseJSON.Tasks);
      } else {
        console.log(`An error occurred status code ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="section-center">
      <SearchBox
        getTasks={getTasks}
        editID={editID}
        setEditID={setEditID}
        tasks={tasks}
      />
      <TasksList tasks={tasks} deleteTask={deleteTask} setEditID={setEditID} />
      {tasks.length === 0 && <h2>No tasks at present.</h2>}
    </div>
  );
}

export default App;
