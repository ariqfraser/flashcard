import { Component, input, output } from "@angular/core";
import { IconButton } from "../icon-button/icon-button";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: "app-page-header",
    imports: [IconButton, MatTooltipModule],
    templateUrl: "./page-header.html",
    styleUrl: "./page-header.scss",
})
export class PageHeader {
    readonly showBack = input(false);
    readonly showHelp = input(false);
    readonly backLink = input<string>("/");
    readonly helpContent = input("This is default help content.");
    readonly subtitle = input<string>();
    readonly onBackClick = output<void>();

    protected handleBackClick() {
        this.onBackClick.emit();
    }
}
