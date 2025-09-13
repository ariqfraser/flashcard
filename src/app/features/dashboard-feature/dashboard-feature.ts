import { Component } from "@angular/core";
import { PageHeader } from "@shared/ui/page-header/page-header";
import { DashboardTile } from "./ui/dashboard-tile/dashboard-tile";

@Component({
    selector: "app-dashboard-feature",
    imports: [PageHeader, DashboardTile],
    templateUrl: "./dashboard-feature.html",
    styleUrl: "./dashboard-feature.scss",
})
export class DashboardFeature {}
