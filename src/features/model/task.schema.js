// Import statements
import mongoose from "mongoose";

// Schema creation 
const taskSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String},
    status:{type:String,enum:['done','pending'],required:true,default:'pending'},
    dueDate:{type:String, required:true}
});

// TaskModel Creation
const TaskModel=new mongoose.model('Task',taskSchema);

export default TaskModel;
