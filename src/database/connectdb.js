/* Importing the mongoose module. */
import mongoose from "mongoose";

try {
  /* Connecting to the database. */
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected successfully");
} catch (error) {
  /* Logging the error message to the console. */
  console.log("Error connecting database: " + error);
}
