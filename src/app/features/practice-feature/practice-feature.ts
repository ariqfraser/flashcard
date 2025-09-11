import { Component, inject, OnInit, Injector, signal } from "@angular/core";
import { PracticeActions } from "./ui/practice-actions/practice-actions";
import { Flashcard } from "./ui/flashcard/flashcard";
import { PracticeFeatureService } from "./practice-feature.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap, tap, of } from "rxjs";
import { MatSnackBarModule } from "@angular/material/snack-bar";
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
    }
}
