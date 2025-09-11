import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Router } from "@angular/router";

export const checkAuth = (): boolean => {
    const user = inject(Auth).currentUser;
    const router = inject(Router);

    if (!user) {
        router.navigate(["/auth"]);
        return false;
    }
    return true;
};
