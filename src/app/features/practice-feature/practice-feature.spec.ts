import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PracticeFeature } from "./practice-feature";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { PracticeFeatureService } from "./practice-feature.service";
import { of } from "rxjs";

@Component({})
class DummyComponent {}

describe("PracticeFeature", () => {
    let component: PracticeFeature;
    let fixture: ComponentFixture<PracticeFeature>;

    beforeEach(async () => {
        const mockService = {
            getCards: (deckId: string) => of([{ front: "Q", back: "A" }]),
        } as Partial<PracticeFeatureService>;

        await TestBed.configureTestingModule({
            imports: [
                PracticeFeature,
                RouterModule.forRoot([{ path: "", component: DummyComponent }]),
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { queryParams: { id: "deck-1", title: "Deck One" } },
                    },
                },
                { provide: PracticeFeatureService, useValue: mockService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PracticeFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
