/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ToDoItem } from "./ToDoItem";
import { AddItem } from "./AddItem";
import "../css/toDoList.css";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { observer } from "mobx-react";
import { SnapshotIn } from "mobx-state-tree";
import { useRootStore } from "../mst/RootStoreContext";
import { TaskModel } from "../mst/AllList";

export const ToDoListView = observer(() => {
  const store = useRootStore();

  //delete one task sending this functuon to ToDoItem
  const handleDeleteItem = (task: SnapshotIn<typeof TaskModel>) => {
    store.allTasks.deleteTask(task);
  };

  //complete or not complete a task
  const handleCompleteItem = (task: SnapshotIn<typeof TaskModel>) => {
    store.allTasks.completeTask(task);
  };

  //add task to the all task
  const handleAddItem = (newTask: SnapshotIn<typeof TaskModel>) => {
    store.allTasks.addTask(newTask);
  };

  //edit task
  const handleEditItem = (
    task: SnapshotIn<typeof TaskModel>,
    newTitle: string
  ) => {
    store.allTasks.editTask(task, newTitle);
  };

  useEffect(() => {
    store.allTasks.fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="header">Todo List {<ChecklistIcon />}</h1>
      <AddItem handleAddItem={handleAddItem} />
      <ul className="listOfTasks">
        {Array.from(store.allTasks.tasks.values()).map(
          (task: SnapshotIn<typeof TaskModel>) => (
            <ToDoItem
              key={task.id}
              task={task}
              handleDeleteItem={handleDeleteItem}
              handleCompleteItem={handleCompleteItem}
              handleEditItem={handleEditItem}
            />
          )
        )}
      </ul>
    </div>
  );
});
