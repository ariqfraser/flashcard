import { ChartConfiguration, ChartType } from "chart.js";

export interface ChartConfig<T extends ChartType> {
    type: T;
    showLegend?: boolean;
    plugins?: ChartConfiguration<T>["plugins"];
    data: ChartConfiguration<T>["data"];
    options: ChartConfiguration<T>["options"];
}
