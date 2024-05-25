// Import statements for internal modules
import TaskModel from "./task.schema.js";


// Repository class creation
export class TaskRepository{
    // Retrieve all tasks
    async retrieveAllTasksRepo(){
        try {
            const tasks=await TaskModel.find();
            return tasks;
        } catch (error) {
            console.log(error);
        }
    }


    // Retrieve a task by id
    async retrieveTaskByIdRepo(taskId){
        try {
            const task=await TaskModel.findById(taskId);
            return task;
        } catch (error) {
            console.log(error);
        }
    }

    // Creating a task
    async createTaskRepo(data){
        try {
            const task=new TaskModel({
                title:data.title,
                description:data.description,
                status:'pending',
                dueDate:data.dueDate
            });

            const savedTask=await task.save();
            console.log(savedTask);
            return savedTask;
        } catch (error) {
            console.log(error);
        }
    }

    // Updating an existing task
    async updateTaskRepo(taskId,data){
        try {
            const task=await TaskModel.findById(taskId);
            if(task){
                const updatedTask=await TaskModel.findByIdAndUpdate(taskId,data);
                if(updatedTask){
                    return true;
                }
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Deleting a task
    async deleteTaskRepo(taskId){
        try {
            const task=await TaskModel.findByIdAndDelete(taskId);
            return task;
        } catch (error) {
            console.log(error);
        }
    }

    async toggleTaskStatusRepo(taskId){
        try {
            const task=await TaskModel.findById(taskId);
            if(task){
                if(task.status=='pending'){
                const isToggled=await TaskModel.findByIdAndUpdate(taskId,{status:'done'});
                return isToggled;
                }else if(task.status=='done'){
                    const isToggled=await TaskModel.findByIdAndUpdate(taskId,{status:'pending'});
                    return isToggled;
                }
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }
}