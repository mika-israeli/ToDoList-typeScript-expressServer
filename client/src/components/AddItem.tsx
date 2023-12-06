import { useState } from "react";
import { Task } from "./ToDoList";
import "../css/addItem.css"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';

//props from the ToDoList component
type AddItemProps = {
  handleAddItem: (task: Task) => void;
};

export const AddItem = ({ handleAddItem }: AddItemProps) => {
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    id: generateRandomId(),
    title: "",
    complete: false,
  });
  const [saveButtomClicked,setSaveButtomClick]=useState(false);
  const [addButtomClick,setAddButtomClick]=useState(true);
  
//show the input just if you press the saveTask buttom
  const handleShowInput = () => {
    setShowInput(!showInput);
    setSaveButtomClick(!saveButtomClicked);
    setAddButtomClick(!addButtomClick)
  };

  //add the new task to the NewTask variable according to the input
  const handleNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prevTask) => ({ ...prevTask, title: event.target.value }));
  };

  //sent the new task to the ToDoList component , reset the input and the save buttom ,,reset the newTask varibale
  const handleSaveButtomClick = () => {
    const updatedTask: Task = { ...newTask, id: generateRandomId() };
    if(updatedTask.title){
      handleAddItem(updatedTask);
    }

    setShowInput(!showInput);
    setSaveButtomClick(!saveButtomClicked);
    setNewTask({ id: generateRandomId(),
      title: "",
      complete: false,})
      setAddButtomClick(!addButtomClick)
    
  };

  const handleExitClicked=()=>{
    setShowInput(!showInput);
    setAddButtomClick(!addButtomClick)
    setSaveButtomClick(!saveButtomClicked);
  }
  //generate a random id for each task
  function generateRandomId() {
    return Math.floor(Math.random() * 10000);
  }

  return (
    <div className="addTaskContainer">
     {addButtomClick ?<AddCircleIcon className="addButtom" onClick={handleExitClicked}/> :<CloseIcon className ="inputButtom" onClick={handleSaveButtomClick}/>} 
        {showInput && (
          <input className="addTaskInput"
            type="text"
            value={newTask.title}
            onChange={handleNewTask}
          />
        )}
        {saveButtomClicked&&<SaveAltIcon className ="inputButtom" onClick={handleSaveButtomClick}/>}
      
    </div>
  );
};


