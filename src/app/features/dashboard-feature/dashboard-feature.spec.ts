import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { DashboardFeature } from "./dashboard-feature";

describe("DashboardFeature", () => {
    let component: DashboardFeature;
    let fixture: ComponentFixture<DashboardFeature>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardFeature],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
