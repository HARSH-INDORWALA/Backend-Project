import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
const connectDB = async()=>{
    try {
        console.log("Connecting to database...");
        console.log("Database URI:", process.env.MONGODB_URI);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Database connected successfully",connectionInstance.connection.host);
    } catch (error) {
        console.log("Error in connecting to database",error);
    }
}

export default connectDB;