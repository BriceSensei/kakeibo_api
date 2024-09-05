export default {
  testEnvironment: "node",
  types: ["@types/jest"],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  "moduleNameMapper": {
    "^@route(.*)$": "<rootDir>/src/routes/$1",
    "^@controller/(.*)$": "<rootDir>/src/controllers/$1",
    "^@class\/(.*)$": "<rootDir>/src/classes/$1",
    "^@@prisma\/(.*)$": "<rootDir>/prisma/$1",
    "^@exception\/(.*)$": "<rootDir>/src/exceptions/$1",
    "^@services\/(.*)$": "<rootDir>/src/services/$1",
    "^@helper\/(.*)$": "<rootDir>/src/helpers/$1",
  }
};