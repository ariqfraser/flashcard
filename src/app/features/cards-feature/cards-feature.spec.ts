import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardsFeature } from "./cards-feature";

describe("CardsFeature", () => {
    let component: CardsFeature;
    let fixture: ComponentFixture<CardsFeature>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardsFeature],
        }).compileComponents();

        fixture = TestBed.createComponent(CardsFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
