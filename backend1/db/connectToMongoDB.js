import mongoose from "mongoose";

const connectToMongoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log('error connecting to mongo')
    }
}

export default connectToMongoDB