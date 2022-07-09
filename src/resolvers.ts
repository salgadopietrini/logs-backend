import { User } from "./db/models/user";
import countries from "./assets/countries.json";

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
  },
  Mutation: {
    createUser: async (_: any, { name, surname, country, birthday }: any) => {
      try {
        const profile = new User({ name, surname, country, birthday });
        await profile.save();
        return profile;
      } catch (err) {
        console.log(err);
      }
    },
    deleteUser: async (_: any, { id }: any) => {
      try {
        await User.deleteOne({ _id: id });
        return await User.countDocuments({ _id: id });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
