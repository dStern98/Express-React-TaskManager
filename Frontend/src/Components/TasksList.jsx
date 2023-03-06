import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export function TasksList({ tasks, deleteTask, setEditID }) {
  return (
    <section className="tasks-list">
      {tasks.map((task, index) => {
        const { _id, priority, description } = task;
        return (
          <div key={index} className="tasks-list-member">
            <p>{description}</p>
            <p className={priority}>{priority} Priority</p>
            <button className="edit-btn" onClick={() => setEditID(_id)}>
              <FaEdit size={15} />
            </button>
            <button className="trash-btn" onClick={() => deleteTask(_id)}>
              <FaTrash size={15} />
            </button>
          </div>
        );
      })}
    </section>
  );
}
