import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DeckEditFeature } from "./deck-edit-feature";

describe("DeckEditFeature", () => {
    let component: DeckEditFeature;
    let fixture: ComponentFixture<DeckEditFeature>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeckEditFeature],
        }).compileComponents();

        fixture = TestBed.createComponent(DeckEditFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
