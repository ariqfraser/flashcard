import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Icon } from "@shared/ui/icon/icon";
import { PageHeader } from "@shared/ui/page-header/page-header";
import { TrainingCard } from "@shared/ui/training-card/training-card";

@Component({
    selector: "app-practice-feature",
    imports: [PageHeader, TrainingCard, Icon],
    templateUrl: "./practice-feature.html",
    styleUrl: "./practice-feature.scss",
})
export class PracticeFeature {
    private readonly router = inject(Router);
    protected showFront = signal(true);
    protected hasFlipped = signal(false);

    goBack() {
        this.router.navigate(["app", "cards"]);
    }

    flipCard() {
        this.showFront.update((value) => !value);
        this.hasFlipped.update(() => true);
    }
}
