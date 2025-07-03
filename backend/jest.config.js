module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: [
        '**/*.js',
        '!**/node_modules/**',
        '!**/tests/**',
        '!**/coverage/**'
    ],
    coverageDirectory: 'coverage',
    testMatch: [
        '**/tests/**/*.test.js'
    ],
    setupFilesAfterEnv: [],
    testTimeout: 10000
}; 