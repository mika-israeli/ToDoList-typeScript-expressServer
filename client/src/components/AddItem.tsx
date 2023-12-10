import { useState } from "react";
import { TaskModel } from "../mst/AllList";
import { SnapshotIn } from "mobx-state-tree";
import "../css/addItem.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";

//props from the ToDoList component
type AddItemProps = {
  handleAddItem: (task: SnapshotIn<typeof TaskModel>) => void;
};

export const AddItem = ({ handleAddItem }: AddItemProps) => {
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState<SnapshotIn<typeof TaskModel>>({
    id: uuidv4(),
    title: "",
    complete: false,
  });
  const [saveButtomClicked, setSaveButtomClick] = useState(false);
  const [addButtomClick, setAddButtomClick] = useState(true);

  //add the new task to the NewTask variable according to the input
  const handleNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prevTask) => ({ ...prevTask, title: event.target.value }));
  };

  //sent the new task to the ToDoList component , reset the input and the save buttom ,reset the newTask varibale ,if there is an empty task you cand add it to the all task
  const handleSaveButtomClick = () => {
    const updatedTask: SnapshotIn<typeof TaskModel> = {
      ...newTask,
      id: uuidv4(),
    };
    if (updatedTask.title) {
      handleAddItem(updatedTask);
    }
    setShowInput(!showInput);
    setSaveButtomClick(!saveButtomClicked);
    setNewTask({ id: uuidv4(), title: "", complete: false });
    setAddButtomClick(!addButtomClick);
  };

  //exit bottom that opan if you press do add a task and you can close the input
  const handleExitClicked = () => {
    setShowInput(!showInput);
    setAddButtomClick(!addButtomClick);
    setSaveButtomClick(!saveButtomClicked);
  };

  return (
    <div className="addTaskContainer">
      {addButtomClick ? (
        <AddCircleIcon className="addButtom" onClick={handleExitClicked} />
      ) : (
        <CloseIcon className="inputButtom" onClick={handleSaveButtomClick} />
      )}
      {showInput && (
        <input
          className="addTaskInput"
          type="text"
          value={newTask.title}
          onChange={handleNewTask}
        />
      )}
      {saveButtomClicked && (
        <SaveAltIcon className="inputButtom" onClick={handleSaveButtomClick} />
      )}
    </div>
  );
};
