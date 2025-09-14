import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainingCard } from "./training-card";
import { inputBinding } from "@angular/core";

describe("TrainingCard", () => {
    let component: TrainingCard;
    let fixture: ComponentFixture<TrainingCard>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrainingCard],
        }).compileComponents();

        fixture = TestBed.createComponent(TrainingCard, {
            bindings: [inputBinding("text", () => "hello")],
        });
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
