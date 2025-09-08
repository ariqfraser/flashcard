const { createCjsPreset } = require("jest-preset-angular/presets");

module.exports = {
    ...createCjsPreset(),
    setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};
