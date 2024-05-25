// Import statements for third party modules
import express from "express";
import dotenv from "dotenv";
import ejsLayouts from "express-ejs-layouts";
import path from "path";

// Import statements for internal modules
import connectToDB from "./src/config/mongooseConfig.js";
import taskRouter from "./src/features/router/task.routes.js";
import { TaskController } from "./src/features/controller/task.controller.js";

// .env file configuration
dotenv.config();

// Server creation
const server=express();

// Parse form data
server.use(express.urlencoded({ extended: true }));

server.use(express.json());
// View engine settings
server.use(ejsLayouts);
server.set('view engine','ejs');
server.set("views",path.join(path.resolve(),"src","features","views"));

// Giving access to static files
server.use(express.static(path.join(path.resolve(),'public')));

// Task router default path
server.use('/tasks',taskRouter);

// Default path
server.use('/',(req,res,next)=>{
    res.redirect('/tasks/');
})
// Port number storage in a variable called port
const port=process.env.PORT;

// Server port declaration
server.listen(port,()=>{
    console.log("server is listening at port "+port);
    // Database connection
    connectToDB();
});