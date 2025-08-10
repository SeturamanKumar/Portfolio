import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './ToDoList.css'

function ToDoList(){

    const [tasks, setTasks] = useState(['Eat Breakfast', 'Take a shower', 'Walk the Dog'])
    const [newTask, setNewTask] = useState('')

    function handleInputChange(event){

        setNewTask(event.target.value)

    }

    function addTask(){

        if(newTask.trim() !== ""){
            setTasks(prevTasks => [...prevTasks, newTask])
            setNewTask("")
        }

    }

    function deleteTask(index){

        const updateTask = tasks.filter((_, i) => i !== index)
        setTasks(updateTask)

    }

    function moveTaskUp(index){
        
        let updatedTasks = [...tasks]
        if(index > 0){
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]]
            setTasks(updatedTasks)
        }

    }

    function moveTaskDown(index){
        
        let updatedTasks = [...tasks]
        if(index < tasks.length - 1){
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]]
            setTasks(updatedTasks)
        }

    }

    return(
        <div className="to-do-list-wrapper">
            <div className="to-do-list">
                <h1>To Do List</h1>
                <div>
                    <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}/>
                    <button
                    className="add-button"
                    onClick={addTask}>
                        Add
                    </button>
                </div>
                <ol className="to-do-list-items">
                    {tasks.map((task, index) => 
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}>
                            ☝️
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}>
                            👇
                        </button>
                    </li>
                )}
                </ol>
            </div>
            <Link to='/' className="back-link">← Back to Portfolio</Link>
        </div>
    )
}

export default ToDoList