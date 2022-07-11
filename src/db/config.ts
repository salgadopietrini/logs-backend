import mongoose from "mongoose";
import { db_user, db_password, db_cluster } from "../env/env";
import chalk from "chalk";

const db = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${db_user}:${db_password}@${db_cluster}.hizvx.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log(chalk.green("Connected to MongoDB"));
  } catch (err) {
    console.error(chalk.red("Unable to connect to the database:"), err);
  }
};

export default db;
