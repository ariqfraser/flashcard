import { AuthGuard } from "@angular/fire/auth-guard";
import { Routes } from "@angular/router";
import { DemoFeature } from "@features/demo-feature/demo-feature";
import { LoginFeature } from "@features/login-feature/login-feature";

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "auth",
    },
    {
        path: "auth",
        component: LoginFeature,
    },
    {
        path: "app",
        canActivate: [AuthGuard],
        children: [{ path: "demo", component: DemoFeature }],
    },
    {
        path: "**",
        pathMatch: "full",
        redirectTo: "app/demo",
    },
];
