import { inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DeckDoc } from "@shared/types/firestore.types";
import { getCardsInDeck$, getDeck } from "@shared/utils/firestore.util";
import { Observable, catchError, map, of, startWith, tap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PracticeFeatureService {
    private readonly firestore = inject(Firestore);
    private readonly snackbar = inject(MatSnackBar);
    private auth = inject(Auth);

    getCards(deckId: string): Observable<any[]> {
        return getCardsInDeck$(this.firestore, deckId, this.auth.currentUser?.uid || "").pipe(
            catchError((err) => {
                console.error("Error fetching cards for deck", deckId, err);
                this.snackbar.open("Error loading cards for deck", "Dismiss", { duration: 3000 });
                return of([]);
            }),
            map((cards) => cards.sort(() => Math.random() - 0.5)),
        );
    }
}
