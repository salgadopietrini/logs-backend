import { User } from "./models/user";

export const resolvers = {
  Query: {
    users: async () => await User.find(),
  },
  Mutation: {
    createUser: async (_: any, { name, surname, country }: any) => {
      const profile = new User({ name, surname, country });
      await profile.save();
      return profile;
    },
  },
};
