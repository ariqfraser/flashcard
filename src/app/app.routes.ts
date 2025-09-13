import { AuthGuard } from "@angular/fire/auth-guard";
import { Routes } from "@angular/router";
import { MobileNav } from "@core/ui/mobile-nav/mobile-nav";
import { Nav } from "@core/ui/nav/nav";

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "auth" },

    // auth (lazy)
    {
        path: "auth",
        loadComponent: () =>
            import("./features/login-feature/login-feature").then((m) => m.LoginFeature),
    },

    // protected app area
    {
        path: "v1",
        component: Nav,
        children: [
            {
                path: "cards",
                loadComponent: () =>
                    import("./features/cards-feature/cards-feature").then((m) => m.CardsFeature),
                title: "My Flashcards",
            },
            {
                path: "practice",
                loadComponent: () =>
                    import("./features/practice-feature/practice-feature").then(
                        (m) => m.PracticeFeature,
                    ),
                title: "Practice",
                data: { showNav: false },
            },
            {
                path: "dashboard",
                loadComponent: () =>
                    import("./features/dashboard-feature/dashboard-feature").then(
                        (m) => m.DashboardFeature,
                    ),
                title: "Dashboard",
                data: { showNav: true },
            },
        ],
    },

    { path: "**", pathMatch: "full", redirectTo: "auth" },
];
