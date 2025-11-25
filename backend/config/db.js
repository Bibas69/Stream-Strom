import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const uri = ENV_VARS.MONGO_URI;

    if (!uri) {
      console.error("❌ MONGO_URI is missing in .env");
      process.exit(1);
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);

    // Render sometimes delays MongoDB connection — retry once
    setTimeout(connectDB, 5000);
  }
};
