import  React, { ReactNode, createContext ,useContext ,useState,useEffect} from "react";
import {Task} from "../interface/taskInterface";


interface TaskContextProps {
    allTasks :Task[];
    setAllTasks :React.Dispatch<React.SetStateAction<Task[]>>
}

export const TaskContext =createContext <TaskContextProps | undefined > (undefined); 

interface TaskContextProviderProps {
    children: ReactNode;
}

export const TaskContextProvider: React.FC<TaskContextProviderProps> = ({ children }) => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
  
    // get all tasks from the server
    useEffect(() => {
      fetch("http://localhost:8000/api/data")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setAllTasks(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }, []);
  
    const contextValue: TaskContextProps = {
      allTasks,
      setAllTasks,
    };
  
    return React.createElement(TaskContext.Provider, { value: contextValue }, children);
  };
  
export const useTaskContext = ()=>{
    const context =useContext(TaskContext);


    if(!context){
        throw new Error('useTaskContext must be used within a TaskContextProvider');
    }
    return context;
}


