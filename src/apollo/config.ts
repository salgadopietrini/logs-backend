import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret_key: string = process.env.SECRET_KEY!;
const username: string = process.env.LOGIN_USER!;
const password: string = process.env.LOGIN_PASS!;

interface Token {
  name: string;
  password: string;
  iat: number;
}

export const apolloServer = async (app: express.Express) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginInlineTrace()],
    csrfPrevention: true,
    cache: "bounded",
    context: ({ req }) => {
      const token = req.headers.authorization?.replace("Bearer ", "");
      const operation = req.body.operationName;

      if (!token) {
        if (operation === "LogIn") {
          if (
            req.body.variables.username === username &&
            req.body.variables.password === password
          ) {
            return;
          } else {
            throw new Error("User or password wrong");
          }
        }
        throw new Error("Missing authorization header");
      }
      const decoded = jwt.verify(token, secret_key) as Token;
      if (decoded.name !== username || decoded.password !== password) {
        throw new Error("Invalid token");
      }
    },
  });
  await server.start();
  server.applyMiddleware({ app });
};
