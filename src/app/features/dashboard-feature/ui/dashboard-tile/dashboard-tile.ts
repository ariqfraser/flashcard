import { Component, input } from "@angular/core";

@Component({
    selector: "div.dashboard-tile",
    imports: [],
    templateUrl: "./dashboard-tile.html",
    styleUrl: "./dashboard-tile.scss",
})
export class DashboardTile {
    readonly title = input<string | undefined>();
}
