
import mongoose from "mongoose"

const connectDB=async()=>{
    try {
     const connectionInstance=await mongoose.connect(`${process.env.MONGOOSE_URL}`)
     console.log(`\nDatabase is connected ! DB host ${connectionInstance.connection.host}`);
    } catch (error) {
       console.log("Database connection error",error)
       process.exit(1);
    }
}
export default connectDB;