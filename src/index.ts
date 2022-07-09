import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

dotenv.config();

const port = process.env.PORT;

const server = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  try {
    await mongoose.connect(
      "mongodb+srv://user:password@cluster0.hizvx.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  app.listen({ port: port }, () => {
    console.log("Running in port", port);
  });
};

server();
