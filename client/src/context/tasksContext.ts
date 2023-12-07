import  React, { ReactNode, createContext ,useContext ,useState,useEffect} from "react";
import {Task} from "../interface/taskInterface";


//which context you share
interface TaskContextProps {
    allTasks :Task[];
    //kind of use state type
    setAllTasks :React.Dispatch<React.SetStateAction<Task[]>>
}
//the task context can be undifined but we fix it with the function useTaskContext
export const TaskContext =createContext <TaskContextProps | undefined > (undefined); 

//reacrNode generic type 
interface TaskContextProviderProps {
    children: ReactNode;
}

//send all the values to the app component this is functioanl component that act like provider
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
  
  //Therapist if the tasks is undefined ,custom hook
export const useTaskContext = ()=>{
    const context =useContext(TaskContext);
    if(!context){
        throw new Error('useTaskContext must be used within a TaskContextProvider');
    }
    return context;
}


