import { inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { collectionData, Firestore } from "@angular/fire/firestore";
import { DeckDoc } from "@shared/types/firestore.types";
import { getUserDecksCollection } from "@shared/utils/firestore.util";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DecksFeatureService {
    private readonly firestore = inject(Firestore);
    private readonly auth = inject(Auth);

    getDecks() {
        const decks = getUserDecksCollection(this.auth.currentUser?.uid!, this.firestore);
        return collectionData(decks) as Observable<DeckDoc[]>;
    }
}
