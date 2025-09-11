import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import {
    collection,
    collectionData,
    CollectionReference,
    docData,
    DocumentData,
    documentId,
    Firestore,
    query,
    Query,
    where,
} from "@angular/fire/firestore";
import { DeckDoc } from "@shared/types/firestore.types";
import { doc } from "firebase/firestore";
import { map, Observable, switchMap, take, tap } from "rxjs";

export const getUserDecksCollection = (userId: string, firestore: Firestore) => {
    return collection(firestore, `/users/${userId}/decks`) as CollectionReference<DeckDoc>;
};

export const getUserCardMembershipCollection = (userId: string, firestore: Firestore) => {
    return collection(firestore, `/users/${userId}/cardMemberships`) as CollectionReference;
};

const getCardsInDeckQuery = (
    firestore: Firestore,
    deckId: string,
    userId: string,
): Query<unknown> => {
    const cardsCollection = collection(
        firestore,
        `/users/${userId}/cardMemberships`,
    ) as CollectionReference;
    return query(cardsCollection, where(`deckIds`, "array-contains", deckId));
};

export const getCardsInDeck$ = (
    firestore: Firestore,
    deckId: string,
    userId: string,
): Observable<DocumentData[]> => {
    const cardsQuery = collectionData(getCardsInDeckQuery(firestore, deckId, userId));
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

export const getDeck = (
    firestore: Firestore,
    userId: string,
    deckId: string,
): Observable<DeckDoc | null> => {
    return docData(doc(firestore, `/users/${userId}/decks/${deckId}`)).pipe(
        map((value) => (value ? (value as DeckDoc) : null)),
        take(1),
    );
};
