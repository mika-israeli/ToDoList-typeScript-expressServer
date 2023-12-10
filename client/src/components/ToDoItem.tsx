import { useState } from "react";
import { TaskModel } from "../mst/AllList";
import { SnapshotIn } from "mobx-state-tree";
import "../css/toDoItem.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { observer } from "mobx-react";

//props from ToDoList component
type ToDoItemProps = {
  task: SnapshotIn<typeof TaskModel>;
  handleDeleteItem: (taskId: number) => void;
  handleCompleteItem: (taskId: number) => void;
  handleEditItem: (taskId: number, newTitle: string) => void;
};
export const ToDoItem = observer(
  ({
    task,
    handleDeleteItem,
    handleCompleteItem,
    handleEditItem,
  }: ToDoItemProps) => {
    const [editable, setEditable] = useState(true);

    //sent to the ToDoList component whith task to delete
    const DeleteItem = () => {
      handleDeleteItem(task.id);
    };
    //sent to the ToDoList component whith task to complete or not complete
    const CompleteTask = () => {
      handleCompleteItem(task.id);
    };
    ///send the change and update it in the task
    const EditTask = (event: React.ChangeEvent<HTMLInputElement>) => {
      handleEditItem(task.id, event.target.value);
    };
    //// when you press edit you can edit and also the save buttom will pop-up
    const handleEditable = () => {
      setEditable(!editable);
    };

    return (
      <li className="task" key={task.id}>
        <input
          className="taskInput"
          type="checkbox"
          checked={task.complete}
          onChange={CompleteTask}
        />
        <label
          htmlFor={`checkbox-${task.id}`}
          className="custom-checkbox"></label>
        <input
          className={
            task.complete ? "taskTitle complete" : "taskTitle notComplite"
          }
          type="text"
          value={task.title}
          readOnly={editable}
          onChange={EditTask}
        />
        <DeleteIcon className="ButtomOfTask" onClick={DeleteItem} />
        <EditIcon className="ButtomOfTask" onClick={handleEditable} />
      </li>
    );
  }
);
