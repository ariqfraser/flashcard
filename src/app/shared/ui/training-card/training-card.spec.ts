import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainingCard } from "./training-card";

describe("TrainingCard", () => {
    let component: TrainingCard;
    let fixture: ComponentFixture<TrainingCard>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrainingCard],
        }).compileComponents();

        fixture = TestBed.createComponent(TrainingCard);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
