import { Schema, model } from "mongoose";
import countries from "../../assets/countries.json";

const schema = new Schema({
  name: { type: String, required: true, maxlength: 20 },
  surname: { type: String, required: true, maxlength: 20 },
  country: {
    type: String,
    required: true,
    maxlength: 20,
    enum: countries.map((country) => country.code),
  },
  birthday: { type: String, required: true, maxlength: 20 },
});

export const User = model("User", schema);
