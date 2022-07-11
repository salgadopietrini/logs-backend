/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts, tsx, js, jsx}", "!src/**/*.d.ts"],
  coverageReporters: ["text", "html"],
};
