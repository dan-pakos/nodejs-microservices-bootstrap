/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
const jestConfigIntegration = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.spec.ts'],
}

export default jestConfigIntegration
