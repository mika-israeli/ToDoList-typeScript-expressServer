import { useEffect } from "react";
import { ToDoItem } from "./ToDoItem";
import { AddItem } from "./AddItem";
import "../css/toDoList.css";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { observer } from "mobx-react";
import { SnapshotIn } from "mobx-state-tree";
import { useRootStore } from "../mst/RootStoreContext";
import { TaskModel } from "../mst/AllList";

export const ToDoList = observer(() => {
  const store = useRootStore();
 
  //delete one task sending this functuon to ToDoItem
  const handleDeleteItem = (taskId: number) => {
    store.all_tasks.deleteTask(taskId);
    store.all_tasks.updateTasks(store.all_tasks.tasks);
  };

  //complete or not complete a task
  const handleCompleteItem = (taskId: number) => {
    store.all_tasks.completeTask(taskId);
    store.all_tasks.updateTasks(store.all_tasks.tasks);
  };

  //add task to the all task
  const handleAddItem = (newTask: SnapshotIn<typeof TaskModel>) => {
    store.all_tasks.addTask(newTask);
    store.all_tasks.updateTasks(store.all_tasks.tasks);
  };

  //edit task
  const handleEditItem = (taskId: number, newTitle: string) => {
    store.all_tasks.editTask(taskId, newTitle);
    store.all_tasks.updateTasks(store.all_tasks.tasks);
  };

  useEffect(() => {
    store.all_tasks.fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="header">Todo List {<ChecklistIcon />}</h1>
      <AddItem handleAddItem={handleAddItem} />
      <ul className="listOfTasks">
        {store.all_tasks.tasks.map((task: SnapshotIn<typeof TaskModel>) => (
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
});
