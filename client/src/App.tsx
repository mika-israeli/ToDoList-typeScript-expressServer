import { ToDoList } from "./components/ToDoList";
import { RootModel } from "./mst/AllList";
import {RootStoreProvider} from "./mst/RootStoreContext"

const store =RootModel.create({
  all_tasks:{
      tasks:[]
  }
});

function App() {
  return (
    ///all the components can get to the store
    <RootStoreProvider value={store}>
   <ToDoList/>
   </RootStoreProvider>
  );
}

export default App;
