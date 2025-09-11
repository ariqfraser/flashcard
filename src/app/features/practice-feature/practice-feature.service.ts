import { inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DeckDoc } from "@shared/types/firestore.types";
import { getDeck } from "@shared/utils/firestore.util";
import { Observable, catchError, map, of, startWith, tap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PracticeFeatureService {
    private readonly router = inject(Router);
    private readonly firestore = inject(Firestore);
    private readonly snackbar = inject(MatSnackBar);
    private auth = inject(Auth);

    getDeck$(deckId: string): Observable<DeckDoc | null> {
        return getDeck(this.firestore, this.auth.currentUser!.uid, deckId).pipe(
            tap((deck) => {
                if (!deck) {
                    this.snackbar.open(`Deck not found!`, undefined, { duration: 3000 });
                    console.error("Deck not found:", deckId);
                    this.router.navigate(["/decks"]);
                }
            }),
            catchError((e) => {
                this.snackbar.open(`Error loading deck!`, undefined, { duration: 3000 });
                console.error(e);
                this.router.navigate(["/decks"]);
                return of(null);
            }),
        );
    }
}
