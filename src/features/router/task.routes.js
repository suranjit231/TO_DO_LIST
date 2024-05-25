// Import statements
import express from "express";
import { TaskController } from "../controller/task.controller.js";

// Express router creation
const taskRouter=express.Router();

// Instance creation of controller class
const taskController=new TaskController();

// Get requests
taskRouter.get('/create',(req,res,next)=>{
    taskController.getCreateTaskForm(req,res,next);
});

taskRouter.get('/',(req,res,next)=>{
    taskController.retrieveAllTasks(req,res,next);
});

taskRouter.get('/delete/:id',(req,res,next)=>{
    taskController.deleteTask(req,res,next);
});

taskRouter.get('/edit/:id',(req,res,next)=>{
    taskController.getEditTaskForm(req,res,next);
});

taskRouter.get('/taskStatus/:id',(req,res,next)=>{
    taskController.toggleStatus(req,res,next);
});

taskRouter.get('/:id',(req,res,next)=>{
    taskController.retrieveTaskById(req,res,next);
});

// Post requests
taskRouter.post('/',(req,res,next)=>{
    taskController.createTask(req,res,next);
});

taskRouter.post('/edit/:id',(req,res,next)=>{
    taskController.updateTask(req,res,next);
});

// Export statement
export default taskRouter;