import { setupZoneTestEnv } from "jest-preset-angular/setup-env/zone";

// Setup Angular zone testing environment
setupZoneTestEnv();

// Polyfill fetch for packages that expect a global fetch (firebase/auth in node)
if (typeof globalThis.fetch === "undefined") {
    // Use node-fetch if available, otherwise provide a minimal stub
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const nodeFetch = require("node-fetch");
        globalThis.fetch = nodeFetch;
    } catch (err) {
        globalThis.fetch = () => Promise.reject(new Error("fetch is not polyfilled"));
    }
}
// Provide basic providers for commonly injected tokens so TestBed.inject can resolve them in unit tests
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { TestBed } = require("@angular/core/testing");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Auth } = require("@angular/fire/auth");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Firestore } = require("@angular/fire/firestore");

    TestBed.configureTestingModule({
        providers: [
            { provide: Auth, useValue: {} },
            { provide: Firestore, useValue: {} },
        ],
    });
} catch (err) {
    // If TestBed isn't available yet, tests will set up their own providers.
}
