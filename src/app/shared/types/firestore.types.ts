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
    id: string; // Firestore document ID (populate with collectionData/docData)

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
    deckIds: string[]; // a card can belong to multiple decks
    addedAt?: FirestoreTimestamp;
    perDeckSrs?: Partial<CardSRS>; // optional per-deck SRS overrides
}
