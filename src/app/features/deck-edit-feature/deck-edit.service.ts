import { inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { addDoc, collection, Firestore } from "@angular/fire/firestore";
import { DeckDoc } from "@shared/types/flashcard.types";
import { checkAuth } from "@shared/utils/check-auth.util";
import { serverTimestamp } from "firebase/firestore";

@Injectable({
    providedIn: "root",
})
export class DeckEditService {
    private readonly auth = inject(Auth);
    private readonly firestore = inject(Firestore);

    async createNewDeck() {
        if (!checkAuth) return;

        const deck: DeckDoc = {
            title: "Untitled deck",
            description: "",
            isPublic: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            ownerId: this.auth.currentUser?.uid ?? "unknown",
        };

        const decksCol = collection(this.firestore, "decks");
        try {
            const ref = await addDoc(decksCol, deck);
            console.log(ref);
        } catch (e) {
            console.error("Error creating deck: ", e);
            throw e;
        }
    }
}
