import { Component, inject, model } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-decks-feature",
    imports: [],
    templateUrl: "./decks-feature.html",
    styleUrl: "./decks-feature.scss",
})
export class DecksFeature {
    private readonly router = inject(Router);

    protected handleCreateNewDeck() {
        this.router.navigate(["app", "decks", "new"]);
    }
}
