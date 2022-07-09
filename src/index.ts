import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./db/config";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

dotenv.config();

const port = process.env.PORT;
const isDevelopment = process.env.NODE_ENV === "development";
const server = async () => {
  const app: Express = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(
    helmet({
      crossOriginEmbedderPolicy: !isDevelopment,
      contentSecurityPolicy: !isDevelopment,
    })
  );
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.get("/", (_: Request, res: Response) => {
    res.send("Express/GraphQL and Typescript Server");
  });

  await db();

  app.listen({ port: port }, () => {
    console.log(`[server]: Server is running at http://localhost:${port}
    You can experiment the queries and mutations at http://localhost:${port}/graphql
    `);
  });
};

server();
