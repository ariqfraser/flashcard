import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DemoFeature } from "./demo-feature";

describe("DemoFeature", () => {
    let component: DemoFeature;
    let fixture: ComponentFixture<DemoFeature>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DemoFeature],
        }).compileComponents();

        fixture = TestBed.createComponent(DemoFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
