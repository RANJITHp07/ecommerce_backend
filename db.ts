import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const url=process.env.MONGO_URL
    if(url){
        await mongoose.connect(url);
        console.log("Connected to database");
    }
 
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
