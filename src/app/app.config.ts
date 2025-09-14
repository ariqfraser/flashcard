import {
    ApplicationConfig,
    EnvironmentProviders,
    provideBrowserGlobalErrorListeners,
    Provider,
    provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter, withViewTransitions } from "@angular/router";

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
import { authInterceptorProvider } from "./core/interceptors/auth.interceptor";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";

const firebaseProviders: (Provider | EnvironmentProviders)[] = [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
        if (!environment.production)
            connectAuthEmulator(getAuth(), "http://localhost:9099", { disableWarnings: true });
        return getAuth();
    }),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => {
        if (!environment.production) connectFirestoreEmulator(getFirestore(), "localhost", 8080);
        return getFirestore();
    }),
];

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withViewTransitions()),
        ...firebaseProviders,
        authInterceptorProvider,
        provideCharts(withDefaultRegisterables()),
    ],
};
