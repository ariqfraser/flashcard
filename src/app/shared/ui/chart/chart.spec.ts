import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { Chart } from "./chart";
import { Component } from "@angular/core";
import { ChartConfig } from "./chart.types";
import { ChartType } from "chart.js";

// Direct instantiation of Chart requires a `config` input. Use the HostComponent test below
// which supplies a minimal config instead.
@Component({
    standalone: true,
    imports: [Chart],
    template: `<div class="chart" [config]="cfg"></div>`,
})
class HostComponent {
    cfg: ChartConfig<ChartType> = {
        type: "bar",
        data: { labels: [], datasets: [] },
        options: {},
    } as any;
}

describe("Chart", () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    it("should create", () => {
        const debug = fixture.debugElement.nativeElement;
        expect(debug).toBeTruthy();
    });
});
