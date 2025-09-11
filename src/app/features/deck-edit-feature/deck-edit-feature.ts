import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { EditDeleteButton } from "./ui/edit-delete-button/edit-delete-button";
import { DeckEditService } from "./deck-edit.service";
import { CardDoc, DeckDoc } from "@shared/types/firestore.types";

@Component({
    selector: "app-deck-edit-feature",
    imports: [FormsModule, EditDeleteButton],
    templateUrl: "./deck-edit-feature.html",
    styleUrl: "./deck-edit-feature.scss",
})
export class DeckEditFeature implements OnInit {
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly deckEditService = inject(DeckEditService);
    protected isNewDeck = this.route.snapshot.routeConfig?.path === "new";
    protected title = signal<string>("Untitled deck");
    protected description = signal<string>("");
    protected cards = signal<CardDoc[]>([]);
    protected newCardFront = signal<string>("");
    protected newCardBack = signal<string>("");

    ngOnInit(): void {}

    handleAddCard() {
        if (!this.newCardFront().trim() || !this.newCardBack().trim()) return;

        this.cards.update((cards) => [
            ...cards,
            { front: this.newCardFront(), back: this.newCardBack() },
        ]);
        this.newCardFront.set("");
        this.newCardBack.set("");
    }

    handleCancel() {
        this.router.navigate(["app", "decks"]);
    }

    handleSave() {
        const deckInfo: Partial<DeckDoc> = {
            title: this.title(),
            description: this.description(),
        };
        const cards: CardDoc[] = this.cards().map((card) => ({
            front: card.front,
            back: card.back,
        }));

        this.deckEditService.createNewDeck(deckInfo, cards);
    }
}
