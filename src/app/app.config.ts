import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
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
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideAnalytics(() => getAnalytics()),
        ScreenTrackingService,
        UserTrackingService,
        provideFirestore(() => getFirestore()),
    ],
};
