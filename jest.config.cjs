/** @type {import('@swc/core').Config} */
const swcConfig = {
  sourceMaps: true,
  module: {
    type: 'commonjs',
  },
  jsc: {
    parser: {
      syntax: 'ecmascript',
      jsx: true,
    },
    transform: {
      react: {
        runtime: 'automatic',
      },
    },
  },
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', swcConfig],
  },
  // testEnvironment: 'jest-environment-jsdom',
  testEnvironment: 'node',
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
};
