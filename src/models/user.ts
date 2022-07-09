import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: String,
  surname: String,
  country: String,
});

export const User = mongoose.model("User", schema);
