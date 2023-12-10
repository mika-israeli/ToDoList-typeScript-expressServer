import { ToDoListView } from "./components/ToDoListView";
import { RootModel } from "./mst/AllList";
import { RootStoreProvider } from "./mst/RootStoreContext";

const store = RootModel.create({
  allTasks: {
    tasks: [],
  },
});

const App = () => {
  return (
    ///all the components can get to the store
    <RootStoreProvider value={store}>
      <ToDoListView />
    </RootStoreProvider>
  );
};

export default App;
