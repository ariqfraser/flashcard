import { Component, input, output, signal } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { Card } from "@shared/types/card.types";
import { IconButton } from "@shared/ui/icon-button/icon-button";

@Component({
    selector: "app-card-list",
    imports: [CardComponent, IconButton],
    templateUrl: "./card-list.component.html",
    styleUrl: "./card-list.component.scss",
})
export class CardListComponent {
    readonly cards = input.required<Card[]>();
    private readonly selectedCards = new Set<Card>();
    protected readonly selectMode = signal<boolean>(false);
    readonly onCardTap = output<Card>();
    readonly onMultiSelect = output<Card[]>();

    handleCardHold(card: Card) {
        this.selectedCards.add(card);
        this.selectMode.set(true);
        this.emitSelectedCards();
    }
    private emitSelectedCards() {
        this.onMultiSelect.emit(Array.from(this.selectedCards));
    }

    exitSelectMode() {
        this.selectMode.set(false);
        this.selectedCards.clear();
    }

    handleCardClick(card: Card) {
        console.log("card clicked", card);
        if (!this.selectMode()) {
            this.onCardTap.emit(card);
            return;
        }

        if (this.selectedCards.has(card)) {
            this.selectedCards.delete(card);
        } else {
            this.selectedCards.add(card);
        }

        this.emitSelectedCards();
    }
}
