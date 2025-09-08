import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import {
    getAnalytics,
    provideAnalytics,
    ScreenTrackingService,
    UserTrackingService,
} from "@angular/fire/analytics";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideFirebaseApp(() =>
            initializeApp({
                projectId: "flashcard-c07be",
                appId: "1:55575010683:web:a18648de155eb2ea9971de",
                storageBucket: "flashcard-c07be.firebasestorage.app",
                apiKey: "AIzaSyD9JeY2odIm7elt46fSKXZi2LeRDVITQ1I",
                authDomain: "flashcard-c07be.firebaseapp.com",
                messagingSenderId: "55575010683",
                measurementId: "G-JC6V73K8MR",
            }),
        ),
        provideAuth(() => getAuth()),
        provideAnalytics(() => getAnalytics()),
        ScreenTrackingService,
        UserTrackingService,
        provideFirestore(() => getFirestore()),
    ],
};
