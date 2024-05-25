// Import statement for internal modules
import { TaskRepository } from "../model/task.repository.js";

// Controller class creation
export class TaskController{
    // Constructor definition
    constructor(){
        this.taskRepo=new TaskRepository();
    }

    async getHome(req,res,next){
        res.render('home');
    }

    async getCreateTaskForm(req,res,next){
        res.render('create-task',{task:null});
    }
    
    // Controller method to handle task creation
    async createTask(req,res,next){
        try {
            console.log(req.body);
            const task=await this.taskRepo.createTaskRepo(req.body);
            console.log(task);
            return res.status(200).redirect('/');
        } catch (error) {
            return res.status(400).send("Something went wrong while trying to create the task")
        }
    }

    // Controller method to handle task deletion
    async deleteTask(req,res,next){
        try {
            console.log(req.params.id);
            const task=await this.taskRepo.deleteTaskRepo(req.params.id);
            if(!task){
                return res.status(400).send("Error in deleting the task");
            }
            return res.status(200).redirect('/');
        } catch (error) {
            return res.status(400).send("Something went wrong while trying to delete the task");
        }
    }

    // Controller method to handle tasks retrieval
    async retrieveAllTasks(req,res,next){
        try {
            const tasks=await this.taskRepo.retrieveAllTasksRepo();
            return res.status(200).render('home',{tasks:tasks});
        } catch (error) {
            return res.status(400).send("Something went wrong while trying to fetch the tasks");
        }
    }

    // Controller method to handle task retrieval by their id
    async retrieveTaskById(req,res,next){
        const {id}=req.params;
        console.log(id);
        try {
            const task=await this.taskRepo.retrieveTaskByIdRepo(req.params.id);
            return res.status(200).send(task);
        } catch (error) {
           return res.status(400).send("Something went wrong while trying to fetch the task"); 
        }
    }

    // Controller method to handle task updation
    async updateTask(req,res,next){
        const {id}=req.params;
        try {
            const task=await this.taskRepo.updateTaskRepo(id,req.body);
            if(task){
                res.status(200).redirect('/');
            }else{
                return res.status(400).send("Error in updating the task");
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Server error");
        }
    }


    // Controller method to get edit task form
    async getEditTaskForm(req, res, next) {
        const { id } = req.params;
        console.log(req.params.id);
        try {
            const task = await this.taskRepo.retrieveTaskByIdRepo(id);
            if (!task) {
                return res.status(404).send("Task not found");
            }
            res.render('edit-task', { task });
        } catch (error) {
            return res.status(400).send("Something went wrong while trying to fetch the task");
        }
    }

    // Controller method to toggle task status
    async toggleStatus(req,res,next){
        const {id}=req.params;
        try {
            const task=await this.taskRepo.retrieveTaskByIdRepo(id);
            if(!task){
                return res.status(400).send("Task doesn't exist");
            }else{
                if(task.status=='pending'){
                    await task.updateOne({status:'done'});
                    await task.save();
                    res.status(200).redirect('/');
                }else if(task.status=='done'){
                    await task.updateOne({status:'pending'});
                    await task.save();
                    res.status(200).redirect('/');
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    }
}