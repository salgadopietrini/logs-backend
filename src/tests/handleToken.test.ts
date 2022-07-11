import {
  generateTokenAtQuery,
  verifyTokenFromRequest,
} from "../auth/handleToken";
import { Request } from "express";
import jwt from "jsonwebtoken";
import chalk from "chalk";

jest.mock("../env/env", () => ({
  username: "admin",
  password: "admin",
  secret_key: "secret_key",
}));

describe("generateTokenAtQuery tests", () => {
  it("should return empty token and false logged status", () => {
    const value = generateTokenAtQuery(undefined, {
      username: "user",
      password: "pass",
    });
    expect(value.token).toBe("");
    expect(value.logged).toBe(false);
  });
  it("should return new token and true logged status", () => {
    const value = generateTokenAtQuery(undefined, {
      username: "admin",
      password: "admin",
    });
    expect(value.token.length > 0).toBe(true);
    expect(value.logged).toBe(true);
  });
});

describe("verifyTokenFromRequest test", () => {
  let logSpy;
  beforeAll(async () => {
    logSpy = jest.fn();
  });

  it("should log a successful logged in message", () => {
    const log = chalk.green("Logged in successful");
    const request = {
      headers: { authorization: "" },
      body: {
        operationName: "LogIn",
        variables: {
          username: "admin",
          password: "admin",
        },
      },
    } as Request;
    logSpy = jest.spyOn(console, "log");
    verifyTokenFromRequest({ req: request });
    expect(logSpy).toHaveBeenCalledWith(log);
  });
  it("should log a user or password wrong message and throw error", () => {
    const log = chalk.red("User or password wrong");
    const request = {
      headers: { authorization: "" },
      body: {
        operationName: "LogIn",
        variables: {
          username: "user",
          password: "pass",
        },
      },
    } as Request;
    logSpy = jest.spyOn(console, "log");

    const action = async () => {
      await verifyTokenFromRequest({ req: request });
    };

    expect(action()).rejects.toThrow();
    expect(logSpy).toHaveBeenCalledWith(log);
  });

  it("should log a must be logged in message and throw error", () => {
    const log = chalk.red("You must be logged in to perform this operation!");
    const request = {
      headers: { authorization: "" },
      body: {
        operationName: "OtherOperation",
        variables: {
          username: "user",
          password: "pass",
        },
      },
    } as Request;
    logSpy = jest.spyOn(console, "log");

    const action = async () => {
      await verifyTokenFromRequest({ req: request });
    };

    expect(action()).rejects.toThrow();
    expect(logSpy).toHaveBeenCalledWith(log);
  });

  it("should log an invalid token message and throw error", () => {
    const newToken1 = jwt.sign(
      { name: "another_user", password: "admin" },
      "secret_key"
    );
    const newToken2 = jwt.sign(
      { name: "admin", password: "another_password" },
      "secret_key"
    );

    const log = chalk.red("Invalid token");
    const request1 = {
      headers: { authorization: "Bearer " + newToken1 },
      body: {
        operationName: "OtherOperation",
        variables: {
          username: "user",
          password: "pass",
        },
      },
    } as Request;
    const request2 = {
      headers: { authorization: "Bearer " + newToken2 },
      body: {
        operationName: "OtherOperation",
        variables: {
          username: "user",
          password: "pass",
        },
      },
    } as Request;
    logSpy = jest.spyOn(console, "log");

    const action1 = async () => {
      await verifyTokenFromRequest({ req: request1 });
    };

    const action2 = async () => {
      await verifyTokenFromRequest({ req: request2 });
    };

    expect(action1()).rejects.toThrow();
    expect(action2()).rejects.toThrow();
    expect(logSpy).toHaveBeenCalledWith(log);
  });
});
