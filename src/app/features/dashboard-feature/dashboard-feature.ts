import { Component } from "@angular/core";
import { PageHeader } from "@shared/ui/page-header/page-header";
import { DashboardTile } from "./ui/dashboard-tile/dashboard-tile";
import { Chart } from "@shared/ui/chart/chart";
import { ChartConfig } from "@shared/ui/chart/chart.types";

@Component({
    selector: "app-dashboard-feature",
    imports: [PageHeader, DashboardTile, Chart],
    templateUrl: "./dashboard-feature.html",
    styleUrl: "./dashboard-feature.scss",
})
export class DashboardFeature {
    readonly barChartConfig: ChartConfig<"bar"> = {
        type: "bar",
        showLegend: false,
        data: {
            labels: ["S", "M", "T", "W", "T", "F", "S"],
            datasets: [
                {
                    label: "Cards revised",
                    data: [100, 1200, 300, 900, 0, 0, 0],
                    backgroundColor: (d) => {
                        const value: number = (d.raw as number) || 0;
                        const max = Math.max(
                            ...(this.barChartConfig.data.datasets[0].data as number[]),
                        ) as number;
                        const frac = Math.min(Math.max(value / max, 0), 1);

                        const lightness = 95 - 32 * frac; // 95 -> 32
                        return `hsl(255 87% ${lightness}%)`;
                    },
                    borderRadius: 8,
                },
            ],
        },
        plugins: [],
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    display: false,
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: "white",
                    },
                },
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label(tooltipItem) {
                            return ` ${tooltipItem.parsed.y} cards revised`;
                        },
                        title: (tooltipItem) => {
                            return `${this.letterToDay(tooltipItem[0].label)} - ${new Date().toLocaleDateString()}`;
                        },
                    },
                },
            },
        },
    };

    private letterToDay(letter: string): string {
        switch (letter) {
            case "S":
                return "Sunday";
            case "M":
                return "Monday";
            case "T":
                return "Tuesday";
            case "W":
                return "Wednesday";
            case "F":
                return "Friday";
            case "A":
                return "Saturday";
            default:
                return letter;
        }
    }
}
