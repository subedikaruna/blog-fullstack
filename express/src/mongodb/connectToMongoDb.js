import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

