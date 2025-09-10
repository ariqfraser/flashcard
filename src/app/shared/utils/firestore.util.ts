import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import {
    collection,
    collectionData,
    CollectionReference,
    DocumentData,
    documentId,
    Firestore,
    query,
    Query,
    where,
} from "@angular/fire/firestore";
import { DeckDoc } from "@shared/types/flashcard.types";
import { Observable, switchMap } from "rxjs";

export const getUserDecksCollection = (userId: string) => {
    const firestore = inject(Firestore);
    const auth = inject(Auth);
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");
    return collection(firestore, `/users/${userId}/decks`) as CollectionReference<DeckDoc>;
};

const getCardsInDeckQuery = (deckId: string): Query<unknown> => {
    const firestore = inject(Firestore);
    const auth = inject(Auth);
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");
    const cardsCollection = collection(
        firestore,
        `/users/${user.uid}/cardMemberships`,
    ) as CollectionReference;
    return query(cardsCollection, where(`deckIds`, "==", deckId));
};

export const getCardsInDeck$ = (deckId: string): Observable<DocumentData[]> => {
    const auth = inject(Auth);
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found");
    const cardsQuery = collectionData(getCardsInDeckQuery(deckId));
    return cardsQuery.pipe(
        switchMap((cardMembership: unknown[]) => {
            const cardIds = cardMembership.map((cm: any) => cm.cardId);
            const cardsQuery = query(
                collection(inject(Firestore), `users/${user.uid}/cards`),
                where(documentId(), "in", cardIds),
            );
            return collectionData(cardsQuery, { idField: "id" });
        }),
    );
};
