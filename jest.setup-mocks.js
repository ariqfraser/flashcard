// jest.setup-mocks.js
// These mocks run before modules are loaded to prevent importing browser-only Firebase code.
const { Observable } = require("rxjs");

jest.mock("@angular/fire/auth", () => ({
    Auth: Symbol("Auth"),
    // user(auth) should return an Observable-like object that has subscribe
    user: (auth) =>
        new Observable((subscriber) => {
            // default: emit null (not signed in)
            subscriber.next(null);
            // keep stream open; tests can override by providing different providers
            return () => {};
        }),
}));

jest.mock("@angular/fire/firestore", () => {
    const { of } = require("rxjs");
    return {
        Firestore: Symbol("Firestore"),
        collection: (firestore, path) => ({ __collectionPath: path }),
        collectionData: (colRef, options) => of([]),
        query: (...args) => ({ __queryArgs: args }),
        where: (...args) => ({ __whereArgs: args }),
        documentId: () => "__id__",
        CollectionReference: Object,
        Query: Object,
    };
});

// Prevent the Angular rxjs-interop helper from requiring a real Observable in unit tests
jest.mock("@angular/core/rxjs-interop", () => ({
    toSignal: (obs) => {
        // return a simple getter signal that calls the observable's subscribe synchronously if possible
        let value = null;
        try {
            if (obs && typeof obs.subscribe === "function") {
                obs.subscribe((v) => {
                    value = v;
                });
            }
        } catch (e) {
            // ignore
        }
        return () => value;
    },
}));

// ng2-charts ships ESM that imports `lodash-es` and fails in Jest's default transform
// environment. Mock it early so tests can import components that list BaseChartDirective
// in their `imports` without pulling the real package.
jest.mock("ng2-charts", () => {
    // Create a lightweight Angular directive so TestBed treats it as a valid standalone directive
    try {
        const ngCore = require("@angular/core");
        const BaseChartDirective = ngCore.Directive({
            standalone: true,
            selector: "[baseChart]",
            // declare inputs used in templates so TestBed accepts property bindings
            inputs: ["data", "options", "plugins", "legend", "type"],
        })(class BaseChartDirective {});
        return { BaseChartDirective };
    } catch (e) {
        // Fallback: return a simple class if @angular/core isn't available in this context
        return { BaseChartDirective: class BaseChartDirective {} };
    }
});
