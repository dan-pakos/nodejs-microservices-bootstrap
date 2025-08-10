/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
const jestConfigUnit = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};

export default jestConfigUnit;
