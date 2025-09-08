// Mock inject and the Auth/Router tokens before importing the module under test so no real AngularFire code runs
jest.mock("@angular/core", () => ({ inject: jest.fn() }));
jest.mock("@angular/fire/auth", () => ({ Auth: {} }));
jest.mock("@angular/router", () => ({ Router: {} }));

import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { checkAuth } from "./check-auth.util";

const mockedInject = inject as unknown as jest.Mock;

describe("checkAuth", () => {
    beforeEach(() => {
        mockedInject.mockReset();
    });

    it("returns true and does not navigate when a user exists", () => {
        const navigate = jest.fn();

        mockedInject.mockImplementation((token: unknown) => {
            if (token === (Auth as unknown)) return { currentUser: { uid: "user1" } };
            if (token === (Router as unknown)) return { navigate };
            return undefined;
        });

        expect(checkAuth()).toBe(true);
        expect(navigate).not.toHaveBeenCalled();
    });

    it("navigates to /auth and returns false when no user is present", () => {
        const navigate = jest.fn();

        mockedInject.mockImplementation((token: unknown) => {
            if (token === (Auth as unknown)) return { currentUser: null };
            if (token === (Router as unknown)) return { navigate };
            return undefined;
        });

        expect(checkAuth()).toBe(false);
        expect(navigate).toHaveBeenCalledWith(["/auth"]);
    });
});
