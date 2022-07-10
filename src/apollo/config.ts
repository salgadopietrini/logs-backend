import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginInlineTrace,
  AuthenticationError,
} from "apollo-server-core";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import jwt from "jsonwebtoken";

export const apolloServer = async (app: express.Express) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginInlineTrace()],
    /*     csrfPrevention: true,
    cache: "bounded", */
    /*    context: ({ req }) => {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) throw new Error("Missing authorization header");
      const decoded = jwt.verify(token, "HFvwsdh2#KU-zWl");
      console.log(decoded);
    
      console.log({ decoded, newToken });  */
    /*       const user = getUser(token);
      if (!user) throw new AuthenticationError("Yu must be logged in");
      return { loggedIn: true }; */
    /*   }, */
  });
  await server.start();
  server.applyMiddleware({ app });
};
