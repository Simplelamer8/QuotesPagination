/** @type {import('jest').Config} */
const config = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
      '^.+\\.svg$': 'jest-svg-transformer',
      '^.+\\.css$': 'identity-obj-proxy',
      "@App/(.*)": "<rootDir>/src/$1",
      "@MyComponents/(.*)": "<rootDir>/src/MyComponents/$1"
    },
    modulePaths: ["<rootDir>/src"],
    moduleDirectories: ['node_modules', 'src', '<rootDir>']
  };
  
  export default config;