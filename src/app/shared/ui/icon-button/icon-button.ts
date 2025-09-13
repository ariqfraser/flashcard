import { Component, computed, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "button.icon-button",
    imports: [MatIconModule],
    templateUrl: "./icon-button.html",
    styleUrl: "./icon-button.scss",
})
export class IconButton {
    readonly icon = input.required<string>();
    readonly size = input<"small" | "medium" | "large">("medium");
}
