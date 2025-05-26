import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  watchman: false,
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.app.json'
    }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$",
};

export default config;
