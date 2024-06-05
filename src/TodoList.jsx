import { useState } from "react"

export default function TodoList(){

    const [tasks,setTasks] = useState(["Task 1", "Task 2", "Task 3"])
    const [newTask, setNewTask]  = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null)
    const [editedTask, setEditedTask] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    function addTask(){

        if(newTask.trim() !== ""){

            setTasks(t => [...t,newTask])
            setNewTask("")
        }

    }

    function deleteTask(index){

        const updateTasks = tasks.filter((_,i) => i !== index)
        setTasks(updateTasks)
    }

    function editTask(index){

        setIsEditing(true)
        setCurrentTaskIndex(index)
        setEditedTask(tasks[index])
    }

    function handleEditedInputChange(event){
        setEditedTask(event.target.value)
        if (errorMessage) {
            setErrorMessage("");
        } 
    }
    
    function saveEditedTask(){

        if (editedTask.trim() !== ""){

            const updatedTasks = tasks.map((task,index) => 
            index === currentTaskIndex ? editedTask : task)
            
            setTasks(updatedTasks)
            setIsEditing(false)
            setCurrentTaskIndex(null)
            setEditedTask("")

        } 
        else {
            setErrorMessage("Task cannot be empty")
        }
    }



    return(
        <>
            <div className="twodo-list">

                <img src="/todo.png" alt="logo"  width={150} height={150}/>
                <br />
                <input type="text" 
                value={newTask} 
                placeholder="Enter new Task" 
                onChange={handleInputChange}/>

                <button value={tasks} 
                onClick={addTask}
                className="add-button"

                >Add Task</button>

                <div> 
                <ol className="order-list">
                    {tasks.map((task,index) => <li key={index}>
                        <span className="text">{task}</span>
                    <button className="edit-button" 
                    onClick={() => editTask(index)}>Edit</button>

                    <button className="delete-button" 
                    onClick={() => deleteTask(index)}>Delete</button>
                    </li>)}
                </ol>
                </div>

                {isEditing && (
                    <div>
                        <h2>Edit Task</h2>
                        <input 
                            type="text" 
                            value={editedTask} 
                            onChange={handleEditedInputChange}
                        />
                        <button 
                            onClick={saveEditedTask}
                            className="save-button" >Save</button>
                        {errorMessage && (
                            <p className="error-message">{errorMessage}</p>
                        )}
                    </div>
                )}



            </div>
        </>
    )
}