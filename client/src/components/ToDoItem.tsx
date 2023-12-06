import {Task} from "./ToDoList"
import { useState } from "react"
import "../css/toDoItem.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

//props from ToDoList component
type ToDoItemProps={
    task:Task;
    handleDeleteItem:(taskId:number)=>void;
    handleCompleteItem:(taskId:number)=>void;
    handleEditItem:(newTitle :string ,taskId :number)=>void;

}
export const ToDoItem =({task,handleDeleteItem,handleCompleteItem,handleEditItem}:ToDoItemProps) =>{
const [editable,setEditable]=useState(true); 

//sent to the ToDoList component whith task to delete
    const DeleteItem = () =>{
        handleDeleteItem(task.id);
    }
    //sent to the ToDoList component whith task to complete or not complete
    const CompleteTask =() =>{
        handleCompleteItem(task.id);
    }
    ///send the change and update it in the task 
    const EditTask =(event: React.ChangeEvent<HTMLInputElement>)=>{
        handleEditItem(event.target.value,task.id);
    }
   //// when you press edit you can edit and also the save buttom will pop-up
    const handleEditable=()=>{
    setEditable(!editable);
    }
    
    return (
        <li className="task" key ={task.id}>
            <input className= "taskInput"
            type="checkbox" 
            checked={task.complete}
            onChange={CompleteTask}
            /> 
            <label htmlFor={`checkbox-${task.id}`} className="custom-checkbox"></label>
            <input className={ task.complete ? "taskTitle complete" : "taskTitle notComplite"}
            type="text"
            value={task.title}
            readOnly={editable}
            onChange={EditTask}
            />
        <DeleteIcon className="ButtomOfTask" onClick={DeleteItem}/>
        <EditIcon className="ButtomOfTask" onClick={handleEditable}/>
        </li>
    )

    
}