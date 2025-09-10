import { AuthGuard } from "@angular/fire/auth-guard";
import { Routes } from "@angular/router";
import { MobileNav } from "@core/ui/mobile-nav/mobile-nav";

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "auth" },

    // auth (lazy)
    {
        path: "auth",
        loadComponent: () =>
            import("./features/login-feature/login-feature").then((m) => m.LoginFeature),
    },

    // protected app area — keep the guard on the parent so children are protected
    {
        path: "app",
        canActivate: [AuthGuard],
        component: MobileNav,
        children: [
            {
                path: "",
                pathMatch: "full",
                loadComponent: () =>
                    import("./features/dashboard-feature/dashboard-feature").then(
                        (m) => m.DashboardFeature,
                    ),
            },
            {
                path: "decks",
                children: [
                    {
                        path: "",
                        pathMatch: "full",
                        loadComponent: () =>
                            import("./features/decks-feature/decks-feature").then(
                                (m) => m.DecksFeature,
                            ),
                    },
                    {
                        path: "new",
                        loadComponent: () =>
                            import("./features/deck-edit-feature/deck-edit-feature").then(
                                (m) => m.DeckEditFeature,
                            ),
                    },
                    {
                        path: "edit/:deckId",
                        loadComponent: () =>
                            import("./features/deck-edit-feature/deck-edit-feature").then(
                                (m) => m.DeckEditFeature,
                            ),
                    },
                ],
            },
            {
                path: "demo",
                loadComponent: () =>
                    import("./features/demo-feature/demo-feature").then((m) => m.DemoFeature),
            },
        ],
    },

    { path: "**", pathMatch: "full", redirectTo: "app" },
];
