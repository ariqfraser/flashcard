import { Component, inject, OnInit, Injector, signal } from "@angular/core";
import { PracticeActions } from "./ui/practice-actions/practice-actions";
import { Flashcard } from "./ui/flashcard/flashcard";
import { PracticeFeatureService } from "./practice-feature.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DeckDoc } from "../../shared/types/firestore.types";

@Component({
    selector: "app-practice-feature",
    imports: [PracticeActions, Flashcard],
    templateUrl: "./practice-feature.html",
    styleUrl: "./practice-feature.scss",
})
export class PracticeFeature implements OnInit {
    private readonly service = inject(PracticeFeatureService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    protected deck = signal<DeckDoc | null>(null);
    protected cards = signal<any[]>([]);
    protected flippedState = signal(false);
    protected currentCardIndex = signal(0);

    flipCard() {
        this.flippedState.set(true);
    }

    handleWrong() {
        this.flippedState.set(false);

        this.showNextCard();
    }

    private showNextCard() {
        const nextIndex = this.currentCardIndex() + 1;
        if (nextIndex < this.cards().length) {
            this.currentCardIndex.set(nextIndex);
        } else {
            // end of cards, navigate back to decks
            this.router.navigate(["/decks"]);
        }
    }

    handleCorrect() {
        this.flippedState.set(false);
        this.showNextCard();
    }

    ngOnInit(): void {
        const deck: Partial<DeckDoc> = this.route.snapshot.queryParams;
        // validate deck ensure it contains at least id and title
        if (!deck?.id || !deck?.title) {
            console.error("Invalid deck data in query params", deck);
            this.router.navigate(["/decks"]);
            return;
        }
        console.log("read deck", deck);
        this.deck.set(deck as DeckDoc);

        this.service.getCards(deck.id).subscribe((cards) => {
            this.cards.set(cards);
            console.log("fetched cards for deck", deck.id, cards);
        });
    }
}
