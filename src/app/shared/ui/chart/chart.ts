import { Component, input } from "@angular/core";
import { ChartConfig } from "./chart.types";
import { ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";

@Component({
    selector: "div.chart",
    imports: [BaseChartDirective],
    templateUrl: "./chart.html",
    styleUrls: ["./chart.scss"],
})
export class Chart {
    readonly config = input.required<ChartConfig<ChartType>>();
}
