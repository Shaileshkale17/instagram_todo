import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DBconnection = async () => {
  try {
    const connectDb = await mongoose.connect(process.env.URL);
    console.log("Connect to database " + connectDb.connection.host);
  } catch (error) {
    exit(1);
    console.log(error);
  }
};

export default DBconnection;
