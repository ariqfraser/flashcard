import { Component } from "@angular/core";
import { PageHeader } from "@shared/ui/page-header/page-header";
import { Card } from "@shared/types/card.types";
import { CardListComponent } from "./ui/card-list.component/card-list.component";

@Component({
    selector: "app-cards-feature",
    imports: [PageHeader, CardListComponent],
    templateUrl: "./cards-feature.html",
    styleUrl: "./cards-feature.scss",
})
export class CardsFeature {
    flashcards: Card[] = [
        { front: "What is the capital of France?", back: "Paris", id: "1" },
        { front: "What is the largest planet in our solar system?", back: "Jupiter", id: "2" },
        { front: "What is the smallest country in the world?", back: "Vatican City", id: "3" },
    ];

    handleCardClick(card: Card) {
        console.log(card);
    }

    handleMultiSelect(cards: Card[]) {
        console.log("selected cards", cards);
    }
}
