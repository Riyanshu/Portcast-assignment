module.exports = {
  "preset": "ts-jest",
  "testEnvironment": "jsdom",
  "transform": {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  "transformIgnorePatterns": [
    "/node_modules/(?!(axios)/)"
  ],
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"],
  "moduleNameMapper": {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^axios$": "axios/dist/node/axios.cjs"
  }
}
