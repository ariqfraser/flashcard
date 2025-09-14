import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { PageHeader } from "@shared/ui/page-header/page-header";
import { TrainingCard } from "@shared/ui/training-card/training-card";

@Component({
    selector: "app-practice-feature",
    imports: [PageHeader, TrainingCard],
    templateUrl: "./practice-feature.html",
    styleUrl: "./practice-feature.scss",
})
export class PracticeFeature {
    private readonly router = inject(Router);
    protected showFront = signal(true);

    goBack() {
        this.router.navigate(["app", "cards"]);
    }

    flipCard() {
        this.showFront.update((value) => !value);
    }
}
