import { serverTimestamp } from "firebase/firestore";

// Accept client Date, Firestore timestamp shape, or a serverTimestamp() sentinel
export type FirestoreTimestamp =
    | Date
    | { seconds: number; nanoseconds: number }
    | ReturnType<typeof serverTimestamp>;

export interface DeckDoc {
    // required
    title: string;
    ownerId: string; // uid of creator/owner
    // prefer using a join collection for membership to avoid large deck documents
    // e.g. /decks/{deckId}/members/{memberId} where each member doc references a cardId
    cardsPreview?: string[]; // optional small list (1-3) of card IDs or preview tokens

    // optional metadata
    description?: string;
    isPublic?: boolean; // visibility
    tags?: string[];

    // counters / denormalized fields
    cardCount?: number; // keep in sync via transaction or Cloud Function

    // timestamps
    createdAt?: FirestoreTimestamp;
    updatedAt?: FirestoreTimestamp;
    lastStudiedAt?: FirestoreTimestamp;

    // collaborators / sharing
    collaboratorIds?: string[];
}

export interface CardSRS {
    repetition: number; // number of successful repetitions
    easiness: number; // ease factor
    intervalDays: number; // current interval in days
    reviewCount?: number;
    lastReviewedAt?: FirestoreTimestamp;
    nextDueAt?: FirestoreTimestamp;
}

export interface CardDoc {
    // required
    front: string;
    back: string;

    // optional
    note?: string;
    media?: string[]; // urls to images/audio
    tags?: string[];

    // timestamps
    createdAt?: FirestoreTimestamp;
    updatedAt?: FirestoreTimestamp;

    // spaced-repetition metadata (optional)
    srs?: CardSRS;
}

/**
 * Membership (join) document for cards/decks relationship.
 * - Location: `users/{userId}/cardMemberships/{membershipId}`}`
 */
export interface CardMembership {
    cardId: string;
    addedAt?: FirestoreTimestamp;
    perDeckSrs?: Partial<CardSRS>; // optional per-deck SRS overrides
}
