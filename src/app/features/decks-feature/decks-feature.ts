import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { DecksFeatureService } from "./decks-feature.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { DeckDoc } from "../../shared/types/firestore.types";

@Component({
    selector: "app-decks-feature",
    imports: [JsonPipe, AsyncPipe, MatIcon],
    templateUrl: "./decks-feature.html",
    styleUrl: "./decks-feature.scss",
})
export class DecksFeature {
    private readonly router = inject(Router);
    private readonly decksFeatureService = inject(DecksFeatureService);
    decks$ = this.decksFeatureService.getDecks();

    public handleCreateNewDeck() {
        this.router.navigate(["app", "decks", "new"]);
    }

    public handlePractice(deck: DeckDoc) {
        console.log("moving to deck", deck);

        this.router.navigate(["app", "practice"], {
            queryParams: { ...deck },
        });
    }
}
