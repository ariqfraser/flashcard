import {
    ApplicationConfig,
    EnvironmentProviders,
    provideBrowserGlobalErrorListeners,
    Provider,
    provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { connectAuthEmulator, getAuth, provideAuth } from "@angular/fire/auth";
import {
    getAnalytics,
    provideAnalytics,
    ScreenTrackingService,
    UserTrackingService,
} from "@angular/fire/analytics";
import { connectFirestoreEmulator, getFirestore, provideFirestore } from "@angular/fire/firestore";

const firebaseProviders: (Provider | EnvironmentProviders)[] = [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
        if (environment.production) connectAuthEmulator(getAuth(), "http://localhost:9099");
        return getAuth();
    }),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => {
        if (environment.production) connectFirestoreEmulator(getFirestore(), "localhost", 8080);
        return getFirestore();
    }),
];

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        ...firebaseProviders,
    ],
};
