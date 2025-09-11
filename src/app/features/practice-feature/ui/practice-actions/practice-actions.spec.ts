import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PracticeActions } from "./practice-actions";

describe("PracticeActions", () => {
    let component: PracticeActions;
    let fixture: ComponentFixture<PracticeActions>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PracticeActions],
        }).compileComponents();

        fixture = TestBed.createComponent(PracticeActions);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
