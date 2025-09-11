import { inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { addDoc, collection, Firestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { CardDoc, CardMembership, DeckDoc } from "@shared/types/firestore.types";
import { checkAuth } from "@shared/utils/check-auth.util";
import { getUserDecksCollection } from "@shared/utils/firestore.util";
import { serverTimestamp } from "firebase/firestore";

@Injectable({
    providedIn: "root",
})
export class DeckEditService {
    private readonly auth = inject(Auth);
    private readonly firestore = inject(Firestore);
    private readonly router = inject(Router);

    createNewDeck(deckInfo: Partial<DeckDoc>, cards: CardDoc[]): void {
        if (!this.auth.currentUser) return;
        deckInfo = {
            ...deckInfo,
            ownerId: this.auth.currentUser!.uid,
            cardCount: cards.length,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        // Create the deck document
        const decksCollection = getUserDecksCollection(this.auth.currentUser?.uid!, this.firestore);
        addDoc(decksCollection, deckInfo)
            .then((deckDocRef) => {
                console.log("Deck created with ID: ", deckDocRef.id);
                return deckDocRef.id;
            })
            .then(async (deckId) => {
                // create cards and memberships sequentially and wait for each to finish
                const uid = this.auth.currentUser?.uid!;
                const cardsCollection = (id: string) =>
                    collection(this.firestore, `/users/${uid}/cards`);
                const membershipsCollection = () =>
                    collection(this.firestore, `/users/${uid}/cardMemberships`);

                for (const card of cards) {
                    const cardDoc: CardDoc = {
                        ...card,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    };

                    const cardRef = await addDoc(cardsCollection(uid), cardDoc);

                    const membership: CardMembership = {
                        cardId: cardRef.id,
                        addedAt: serverTimestamp(),
                        deckIds: [deckId],
                    };

                    await addDoc(membershipsCollection(), membership);
                    console.log("Card created with ID: ", cardRef.id);
                }

                // navigate once after all cards are created
                this.router.navigate(["app", "decks"]);
            });
    }
}
