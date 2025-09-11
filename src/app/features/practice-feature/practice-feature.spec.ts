import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PracticeFeature } from "./practice-feature";

describe("PracticeFeature", () => {
    let component: PracticeFeature;
    let fixture: ComponentFixture<PracticeFeature>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PracticeFeature],
        }).compileComponents();

        fixture = TestBed.createComponent(PracticeFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
