import {types,flow,SnapshotIn } from 'mobx-state-tree';
import { Instance } from 'mobx-state-tree/dist/internal';
import { v4 as uuidv4 } from 'uuid';

//model of one task
const TaskModel =types.model ("Task",{
    id:types.optional(types.identifier , ()=>`${uuidv4()}`),
    title :types.string,
    complete :types.boolean
})
//model of all tasks
const AllTasksModel = types.model("allTasks", {
    tasks: types.array(TaskModel)
})
.actions(self => ({
    // Action to fetch tasks from the server
    fetchTasks: flow(function* () {
        try {
            const response:Response  = yield fetch("http://localhost:8000/api/data");
            const data = yield response.json(); 
            self.tasks = data;
        } catch (error) {
            console.error("Failed to fetch all tasks from the server", error);
        }
    }),

    // Action to update tasks on the server
    updateTasks: flow(function* (newTasks) {
        try {
            const response = yield fetch('http://localhost:8000/api/data', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTasks),
            });
            const data = yield response.json();
            self.tasks = newTasks; // Update the local state
        } catch (error) {
            console.error("Failed to update tasks", error);
        }
    }),
    completeTask(taskId:any){
        const task = self.tasks.find(task => task.id === taskId);
        if (task) {
            task.complete = !task.complete;
            this.updateTasks(self.tasks);
        }
    },
    editTask (taskId :any ,newTitle :string){
        const task = self.tasks.find(task => task.id === taskId);
        if(task){
            task.title=newTitle;
            this.updateTasks(self.tasks);
        }
    },
    addTask (newTask: SnapshotIn<typeof TaskModel>){
        self.tasks.push(TaskModel.create(newTask));
        this.updateTasks(self.tasks);
    },
    deleteTask(taskId:any){
        const updatedTasks = self.tasks.filter(task => task.id !== taskId);
        self.tasks.replace(updatedTasks);
        this.updateTasks(self.tasks);
    },
    
}));



//root model
const RootModel =types.model("Root",{
    allTasks :AllTasksModel
})

export interface Root extends Instance<typeof RootModel> { };
export type AllTasks = Instance <typeof AllTasksModel >
export type Task = Instance <typeof TaskModel >
export {RootModel,TaskModel};
