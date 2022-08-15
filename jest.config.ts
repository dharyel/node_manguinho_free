/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    // A preset that is used as a base for Jest's configuration
    preset: 'ts-jest',
    // The glob patterns Jest uses to detect test files
    // testMatch: [
    //   "**/__tests__/**/*.[jt]s?(x)",
    //   "**/?(*.)+(spec|test).[tj]s?(x)"
    // ],
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
        '\\\\node_modules\\\\'
    ]
}
