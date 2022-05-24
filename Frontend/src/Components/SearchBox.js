import React, {useState, useEffect} from "react";
import {metadata} from "../metadata";
const baseURL = metadata.baseURL;

export function SearchBox({getTasks, editID, setEditID,tasks}) {
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("default");

    useEffect(()=> {
        if (editID) {
            const task_to_update = tasks.find((task)=> task._id === editID);
            setDescription(task_to_update.description)
            setPriority(task_to_update.priority)
        }
    }, [editID, tasks])

    const updateTask = async () => {
        const updateJSON = {description, priority}

        if (updateJSON.priority === "default") {
            updateJSON.priority = "low";
        }

        try {
            const response = await fetch(`${baseURL}${editID}`, 
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(updateJSON)
            })
            if (response.ok) {
                setEditID(null);
                setPriority("default");
                setDescription("");
                getTasks();
            }
            else {
                console.log(`An error occurred ${response.status}`)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const createTask = async () => {
        if (!description) {
            return 
        }
        const jsonBody = {priority, description}

        if (jsonBody.priority === "default") {
            jsonBody.priority = "low"
        }
        try {
            const response = await fetch(baseURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(jsonBody)
            })
            if (response.status === 201) {
                setDescription("");
                setPriority("default");
                getTasks();
            }
            else {
                console.log(`Response code: ${response.status}`)
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editID === null) {
            createTask();
        }
        else {
            updateTask();
        }
    }
    return (
    <section className="form-section">
        <h2>Task Manager</h2>
        <form onSubmit={handleSubmit}>
            <div className="form">
                <input type="text" placeholder="ex. Walk the dog"
                value={description} 
                onChange={(e)=> setDescription(e.target.value)}></input>
                <select name="choice" onChange={(e)=> setPriority(e.target.value)}
                defaultValue={priority}>
                    <option value="default">--Choose a priority--</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button type="submit" className="submit-btn">
                    {editID === null? "Submit": "Edit"}
                </button>
            </div>
        </form>

    </section>)
}