import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/swagger/",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/swagger/",
  ],
  testTimeout: 70000,
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "./test-nice-report",
      "filename": "main.html",
      "openReport": false
    }]
  ],
};

export default config;
