import { User } from "../db/models/user";
import countries from "../assets/countries.json";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { LogInArgs, CreateUserArgs, DeleteUserArgs } from "./typeDefs";
dotenv.config();

const secret_key: string = process.env.SECRET_KEY!;
const username: string = process.env.LOGIN_USER!;
const password: string = process.env.LOGIN_PASS!;

export const resolvers = {
  Query: {
    users: async () => {
      try {
        const profile = await User.find();
        return profile;
      } catch (err) {
        console.log(err);
      }
    },
    countries: () => countries,
    logIn: (_: undefined, args: LogInArgs) => {
      if (args.username === username && args.password === password) {
        const newToken = jwt.sign(
          { name: args.username, password: args.password },
          secret_key
        );
        return {
          token: newToken,
          logged: true,
        };
      } else {
        return {
          token: "",
          logged: false,
        };
      }
    },
  },
  Mutation: {
    createUser: async (
      _: undefined,
      { name, surname, country, birthday }: CreateUserArgs
    ) => {
      try {
        const profile = new User({ name, surname, country, birthday });
        await profile.save();
        return profile;
      } catch (err) {
        console.log(err);
      }
    },
    deleteUser: async (_: undefined, { id }: DeleteUserArgs) => {
      try {
        await User.deleteOne({ _id: id });
        return await User.countDocuments({ _id: id });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
