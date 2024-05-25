// Import statements
import mongoose from "mongoose";
import dotenv from "dotenv";

// .env file configuration
dotenv.config();

// Storing database url in a variable called url
//const url=process.env.DB_URL+'/task_db';

// Database connectivity
const connectToDB=async()=>{
    try {
        // Establishing connection
        await mongoose.connect("mongodb://localhost:27017/task_db");
        console.log("MongoDB is connected using Mongoose");
    } catch (error) {
        // Consoling out error if any
        console.log(error);
    }
}


// Export statement
export default connectToDB;
