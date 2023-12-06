import { ToDoList } from "./components/ToDoList";
import {TaskContextProvider} from "./context/tasksContext"

function App() {
  return (
    ///all the components can get to the conexr task
    <TaskContextProvider>
   <ToDoList/>
   </TaskContextProvider>
  );
}

export default App;
