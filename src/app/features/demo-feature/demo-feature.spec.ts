// Ensure we mock the auth module before importing the component so 'user' returns a safe subscribable
import { of } from "rxjs";

jest.mock("@angular/fire/auth", () => ({
    Auth: Symbol("Auth"),
    user: () => of(null),
}));

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DemoFeature } from "./demo-feature";
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { AuthService } from "@core/services/auth.service";
import { CardService } from "@core/services/card.service";

describe("DemoFeature", () => {
    let component: DemoFeature;
    let fixture: ComponentFixture<DemoFeature>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DemoFeature],
            providers: [
                { provide: Auth, useValue: {} },
                { provide: Firestore, useValue: {} },
                {
                    provide: AuthService,
                    useValue: { signInWithGoogle: jest.fn(), signOut: jest.fn() },
                },
                { provide: CardService, useValue: { addCard: jest.fn() } },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DemoFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
