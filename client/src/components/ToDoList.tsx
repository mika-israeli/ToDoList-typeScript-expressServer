import { ToDoItem } from "./ToDoItem";
import { AddItem } from "./AddItem";
import "../css/toDoList.css"
import ChecklistIcon from '@mui/icons-material/Checklist';
import {Task} from "../interface/taskInterface";
import {useTaskContext} from "../context/tasksContext"



export const ToDoList = () => {
  //the context fron the taskContext 
 const {allTasks, setAllTasks } =useTaskContext();

  //delete one task sending this functuon to ToDoItem
  const handleDeleteItem = (taskId: number) => {
    setAllTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        updateServerData(updatedTasks); //update the server
        return updatedTasks;
    });
};

//complete or not complete a task
const handleCompleteItem = (taskId: number) => {
  setAllTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
          task.id === taskId ? { ...task, complete: !task.complete } : task
      );
      updateServerData(updatedTasks); // Update the server
      return updatedTasks;
  });
};

//add task to the all task
  const handleAddItem = (newTask: Task) => {
    setAllTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        updateServerData(updatedTasks);//Update the server
        return updatedTasks;
    });
};

//edit task
const handleEditItem = (newTitle: string, taskId: number) => {
  setAllTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
      );
      updateServerData(updatedTasks); // Update the server
      return updatedTasks;
  });
};

//function that call when there any change about all task (add,edit,delete...)
// and the function will update the server with the change
  const updateServerData = (tasks: Task[]) => {
    fetch('http://localhost:8000/api/data', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Data updated successfully:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
};

  return (
    <div>
    
      <h1 className="header">Todo List { <ChecklistIcon />}</h1> 
      <AddItem handleAddItem={handleAddItem} />
      <ul className="listOfTasks">
        {allTasks.map((task) => (
          <ToDoItem 
            key={task.id}
            task={task}
            handleDeleteItem={handleDeleteItem}
            handleCompleteItem={handleCompleteItem}
            handleEditItem={handleEditItem}
          />
        ))}
      </ul>
    </div>
  );
};
