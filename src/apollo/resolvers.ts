import { User } from "../db/models/user";
import countries from "../assets/countries.json";
import { CreateUserArgs, DeleteUserArgs } from "../types/types";
import { generateTokenAtQuery } from "../auth/handleToken";
import chalk from "chalk";

const resolvers = {
  Query: {
    users: async () => {
      try {
        const profile = await User.find();
        return profile;
      } catch (err) {
        console.log(chalk.red("Query error: "), err);
      }
    },
    countries: () => countries,
    logIn: generateTokenAtQuery,
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
        console.log(chalk.red("Mutatation error: "), err);
      }
    },
    deleteUser: async (_: undefined, { id }: DeleteUserArgs) => {
      try {
        await User.deleteOne({ _id: id });
        return await User.countDocuments({ _id: id });
      } catch (err) {
        console.log(chalk.red("Mutatation error: "), err);
      }
    },
  },
};

export default resolvers;
