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
import { DeckDoc } from "@shared/types/firestore.types";
import { Observable, switchMap } from "rxjs";

export const getUserDecksCollection = (userId: string, firestore: Firestore) => {
    return collection(firestore, `/users/${userId}/decks`) as CollectionReference<DeckDoc>;
};

export const getUserCardMembershipCollection = (userId: string, firestore: Firestore) => {
    return collection(firestore, `/users/${userId}/cardMemberships`) as CollectionReference;
};

const getCardsInDeckQuery = (
    deckId: string,
    firestore: Firestore,
    userId: string,
): Query<unknown> => {
    const cardsCollection = collection(
        firestore,
        `/users/${userId}/cardMemberships`,
    ) as CollectionReference;
    return query(cardsCollection, where(`deckIds`, "==", deckId));
};

export const getCardsInDeck$ = (
    deckId: string,
    firestore: Firestore,
    userId: string,
): Observable<DocumentData[]> => {
    const cardsQuery = collectionData(getCardsInDeckQuery(deckId, firestore, userId));
    return cardsQuery.pipe(
        switchMap((cardMembership: unknown[]) => {
            const cardIds = cardMembership.map((cm: any) => cm.cardId);
            const cardsQuery = query(
                collection(firestore, `users/${userId}/cards`),
                where(documentId(), "in", cardIds),
            );
            return collectionData(cardsQuery, { idField: "id" });
        }),
    );
};
