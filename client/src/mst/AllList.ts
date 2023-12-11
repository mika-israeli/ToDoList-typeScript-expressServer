import {
  types,
  flow,
  Instance,
  getSnapshot,
  SnapshotIn,
} from "mobx-state-tree";
import { v4 as uuidv4 } from "uuid";

//model of one task
const TaskModel = types.model("Task", {
  id: types.optional(types.identifier, () => `${uuidv4()}`),
  title: types.string,
  complete: types.boolean,
});
//model of all tasks
const AllTasksModel = types
  .model("allTasks", {
    tasks: types.map(TaskModel),
  })
  .actions((self) => ({
    // Action to fetch tasks from the server
    fetchTasks: flow(function* () {
      try {
        const response: Response = yield fetch(
          "http://localhost:8000/api/data"
        );
        const dataArray = yield response.json();
        console.log(dataArray);
        self.tasks.clear();
        //fhange from array to object map
        dataArray.forEach((taskData: SnapshotIn<typeof TaskModel>) => {
          if (taskData) {
            console.log(taskData);
            self.tasks.put(taskData);
          }
        });
      } catch (error) {
        console.error("Failed to fetch all tasks from the server", error);
      }
    }),

    // Action to update tasks on the server
    updateTasks: flow(function* () {
      try {
        // Convert the tasks map to an array
        const tasksArray = Array.from(self.tasks.values()).map((task) =>
          getSnapshot(task)
        );

        const jsonString = JSON.stringify(tasksArray); // Convert the array to a JSON string
        console.log(jsonString);

        const response = yield fetch("http://localhost:8000/api/data", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        });
        if (!response.ok) {
          throw new Error("Server responded with an error.");
        }
      } catch (error) {
        console.error("Failed to update tasks", error);
      }
    }),
    completeTask(task: SnapshotIn<typeof TaskModel>) {
      if (task.id && self.tasks.get(task.id)) {
        const fetchedTask = self.tasks.get(task.id);
        if (fetchedTask) {
          fetchedTask.complete = !fetchedTask.complete;
          this.updateTasks();
        }
      }
    },
    editTask(task: SnapshotIn<typeof TaskModel>, newTitle: string) {
      if (task.id && self.tasks.get(task.id)) {
        const updateTask = self.tasks.get(task.id);
        if (updateTask) {
          updateTask.title = newTitle;
          self.tasks.delete(task.id);
          this.addTask(updateTask);
          this.updateTasks();
        }
      }
    },
    addTask(newTask: SnapshotIn<typeof TaskModel>) {
      const task = TaskModel.create(newTask);
      self.tasks.put(task);
      this.updateTasks();
    },
    deleteTask(task: SnapshotIn<typeof TaskModel>) {
      if (task.id && self.tasks.get(task.id)) {
        self.tasks.delete(task.id);
        this.updateTasks();
      }
    },
  }));

//root model
const RootModel = types.model("Root", {
  allTasks: AllTasksModel,
});

export interface Root extends Instance<typeof RootModel> {}
export type AllTasks = Instance<typeof AllTasksModel>;
export type Task = Instance<typeof TaskModel>;
export { RootModel, TaskModel };
