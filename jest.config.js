const { createCjsPreset } = require("jest-preset-angular/presets");

module.exports = {
    ...createCjsPreset(),
    setupFiles: ["<rootDir>/jest.setup-mocks.js"],
    setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
    moduleNameMapper: {
        "^@features/(.*)$": "<rootDir>/src/app/features/$1",
        "^@env/(.*)$": "<rootDir>/src/environments/$1",
        "^@core/(.*)$": "<rootDir>/src/app/core/$1",
        "^@shared/(.*)$": "<rootDir>/src/app/shared/$1",
        "^@public/(.*)$": "<rootDir>/src/app/public/$1",
        "^.+\\.(css|scss|sass|less)$": "identity-obj-proxy",
        "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
    // TODO: Enable on first release
    // coverageThreshold: {
    //     global: {
    //         branches: 80,
    //         functions: 80,
    //         lines: 80,
    //         statements: 80,
    //     },
    // },
};
