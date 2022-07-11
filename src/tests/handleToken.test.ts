import { generateTokenAtQuery } from "../auth/handleToken";

jest.mock("../env/env", () => ({
  username: "admin",
  password: "admin",
  secret_key: "secret_key",
}));

describe("InvoiceTable test", () => {
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
