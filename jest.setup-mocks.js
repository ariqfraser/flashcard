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

jest.mock("@angular/fire/firestore", () => ({
    Firestore: Symbol("Firestore"),
}));

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
