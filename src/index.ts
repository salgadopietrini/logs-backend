import express, { Express, Request, Response } from "express";
import { port, isDevelopment } from "./env/env";
import db from "./db/config";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { apolloServer } from "./apollo/config";
import chalk from "chalk";

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
    res.send(
      "Express/GraphQL and Typescript Server, made by Manuel Salgado Pietrini"
    );
  });

  await db();

  app.listen({ port: port }, () => {
    console.log(
      chalk.blue(
        "Express/GraphQL and Typescript Server, made by Manuel Salgado Pietrini"
      )
    );

    console.log(chalk.green(`Server is running at http://localhost:${port}`));

    console.log(
      chalk.yellow(`To experiment the queries and mutations at http://localhost:${port}/graphql
    you must comment line 15 on /apollo/config.ts, disabling token auth`)
    );
  });
})();
