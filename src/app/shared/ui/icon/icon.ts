import { Component, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-icon",
    imports: [MatIconModule],
    templateUrl: "./icon.html",
    styleUrl: "./icon.scss",
})
export class Icon {
    icon = input.required<string>();
    size = input<"small" | "medium" | "large">("small");
}
