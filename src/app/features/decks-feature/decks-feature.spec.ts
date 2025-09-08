import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DecksFeature } from "./decks-feature";

describe("DecksFeature", () => {
    let component: DecksFeature;
    let fixture: ComponentFixture<DecksFeature>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DecksFeature],
        }).compileComponents();

        fixture = TestBed.createComponent(DecksFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
