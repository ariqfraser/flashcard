import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { PageHeader } from "@shared/ui/page-header/page-header";

@Component({
    selector: "app-practice-feature",
    imports: [PageHeader],
    templateUrl: "./practice-feature.html",
    styleUrl: "./practice-feature.scss",
})
export class PracticeFeature {
    private readonly router = inject(Router);

    goBack() {
        this.router.navigate(["app", "cards"]);
    }
}
