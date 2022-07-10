import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./db/config";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { apolloServer } from "./apollo/config";

dotenv.config();

const port = process.env.PORT;
const isDevelopment = process.env.NODE_ENV === "development";

(async () => {
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

  await apolloServer(app);

  app.get("/", (_: Request, res: Response) => {
    res.send("Express/GraphQL and Typescript Server");
  });

  await db();

  app.listen({ port: port }, () => {
    console.log(`[server]: Server is running at http://localhost:${port}
    You can experiment the queries and mutations at http://localhost:${port}/graphql
    `);
  });
})();
