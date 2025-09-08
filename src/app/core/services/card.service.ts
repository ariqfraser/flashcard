import { inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import {
    collection,
    addDoc,
    doc,
    setDoc,
    getDocs,
    query,
    where,
    orderBy,
    writeBatch,
    updateDoc,
    deleteDoc,
    documentId,
    collectionGroup,
    increment,
    serverTimestamp,
} from "firebase/firestore";

import { CardDoc, DeckMember } from "@shared/types/card.types";

@Injectable({
    providedIn: "root",
})
export class CardService {
    private readonly auth = inject(Auth);
    private readonly firestore = inject(Firestore);

    async addCard(card: CardDoc) {
        try {
            const user = this.auth.currentUser;
            const now = serverTimestamp();
            const payload = {
                ...card,
                createdAt: card.createdAt ?? now,
                updatedAt: card.updatedAt ?? now,
                createdBy:
                    card.createdBy ??
                    (user
                        ? { uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }
                        : undefined),
            };

            const ref = await addDoc(collection(this.firestore, "cards"), payload);
            return ref.id;
        } catch (e) {
            console.error("Error adding card: ", e);
            throw e;
        }
    }

    async addCardToDeck(
        cardId: string,
        deckId: string,
        opts?: { order?: number; perDeckSrs?: Partial<DeckMember["perDeckSrs"]> },
    ) {
        try {
            const memberRef = doc(this.firestore, `decks/${deckId}/members/${cardId}`);
            const now = serverTimestamp();
            const member: DeckMember = {
                cardId,
                order: opts?.order,
                addedAt: now,
            };

            // write member and increment cardCount atomically using a batch
            const batch = writeBatch(this.firestore);
            batch.set(memberRef, member, { merge: true });
            const deckRef = doc(this.firestore, `decks/${deckId}`);
            batch.update(deckRef, { cardCount: increment(1) });
            await batch.commit();
        } catch (e) {
            console.error("Error adding card to deck:", e);
            throw e;
        }
    }

    async removeCardFromDeck(cardId: string, deckId: string) {
        try {
            const memberRef = doc(this.firestore, `decks/${deckId}/members/${cardId}`);
            const batch = writeBatch(this.firestore);
            batch.delete(memberRef);
            const deckRef = doc(this.firestore, `decks/${deckId}`);
            batch.update(deckRef, { cardCount: increment(-1) });
            await batch.commit();
        } catch (e) {
            console.error("Error removing card from deck:", e);
            throw e;
        }
    }

    /**
     * Fetches cards for a deck by reading member docs then batch-getting cards in chunks.
     */
    async getCardsForDeck(deckId: string) {
        try {
            const membersQ = query(
                collection(this.firestore, `decks/${deckId}/members`),
                orderBy("order"),
            );
            const membersSnap = await getDocs(membersQ);
            const cardIds = membersSnap.docs
                .map((d) => d.data()["cardId"])
                .filter(Boolean) as string[];

            const chunks: string[][] = [];
            for (let i = 0; i < cardIds.length; i += 30) chunks.push(cardIds.slice(i, i + 30));

            const cards: any[] = [];
            for (const chunk of chunks) {
                const cardsQ = query(
                    collection(this.firestore, "cards"),
                    where(documentId(), "in", chunk),
                );
                const snap = await getDocs(cardsQ);
                snap.docs.forEach((d) => cards.push({ id: d.id, ...d.data() }));
            }

            // preserve order according to members
            const cardsById = new Map(cards.map((c) => [c.id, c]));
            return cardIds.map((id) => cardsById.get(id)).filter(Boolean);
        } catch (e) {
            console.error("Error fetching cards for deck:", e);
            throw e;
        }
    }

    async updateCard(cardId: string, patch: Partial<CardDoc>) {
        try {
            const ref = doc(this.firestore, `cards/${cardId}`);
            await updateDoc(ref, { ...patch, updatedAt: new Date() });
        } catch (e) {
            console.error("Error updating card:", e);
            throw e;
        }
    }

    async deleteCard(cardId: string) {
        try {
            // delete card doc
            const ref = doc(this.firestore, `cards/${cardId}`);
            await deleteDoc(ref);

            // delete member docs across decks (collection group)
            const membersQ = query(
                collectionGroup(this.firestore, "members"),
                where("cardId", "==", cardId),
            );
            const membersSnap = await getDocs(membersQ);
            const batch = writeBatch(this.firestore);
            membersSnap.docs.forEach((d) => batch.delete(d.ref));
            await batch.commit();
        } catch (e) {
            console.error("Error deleting card:", e);
            throw e;
        }
    }
}
