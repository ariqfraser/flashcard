import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PracticeFeature } from "./practice-feature";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";

@Component({})
class DummyComponent {}

describe("PracticeFeature", () => {
    let component: PracticeFeature;
    let fixture: ComponentFixture<PracticeFeature>;

    beforeEach(async () => {
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
