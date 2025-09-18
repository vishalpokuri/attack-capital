// config/db.ts
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const dbUrl =
      process.env.DATABASE_URL || "mongodb://localhost:27017/default";
    await mongoose.connect(dbUrl);

    // Import all models to ensure they're registered
    await import("./models");

    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to Database", error);
    process.exit(1);
  }
};

export default connectDB;
