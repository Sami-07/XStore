import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
     
    }
    catch (err) {
       
    }
}
export default connectDB


