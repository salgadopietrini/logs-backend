import jwt from "jsonwebtoken";
import { Request } from "express";
import { secret_key, username, password } from "../env/env";
import { Token, LogInArgs } from "../types/types";
import chalk from "chalk";

export const verifyTokenFromRequest = ({ req }: { req: Request }) => {
  const token = req.headers.authorization!.replace("Bearer ", "");
  const operation = req.body.operationName;

  if (!token) {
    console.log(chalk.yellow("No token, verifying operation..."));
    console.log(chalk.blue(operation));
    if (operation === "LogIn") {
      if (
        req.body.variables.username === username &&
        req.body.variables.password === password
      ) {
        console.log(chalk.green("Logged in successful"));
        return;
      } else {
        console.log(chalk.red("User or password wrong"));
        throw new Error("User or password wrong");
      }
    }
    console.log(chalk.red("You must be logged in to perform this operation!"));
    throw new Error("Missing authorization header");
  }
  const decoded = jwt.verify(token, secret_key) as Token;
  if (decoded.name !== username || decoded.password !== password) {
    console.log(chalk.red("Invalid token"));
    throw new Error("Invalid token");
  }
};

export const generateTokenAtQuery = (_: undefined, args: LogInArgs) => {
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
};
