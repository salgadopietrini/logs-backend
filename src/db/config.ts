import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_cluster = process.env.DB_CLUSTER;

const db = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${db_user}:${db_password}@${db_cluster}.hizvx.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

export default db;
