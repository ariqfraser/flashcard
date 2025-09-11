import { inject, Injectable } from "@angular/core";
import { Auth, GoogleAuthProvider, signInWithPopup } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly auth = inject(Auth);
    private readonly router = inject(Router);

    async signOut(): Promise<void> {
        await this.auth.signOut();
        this.router.navigate(["/auth"]);
    }

    async signInWithGoogle(): Promise<void> {
        const provider = new GoogleAuthProvider();
        try {
            const credentials = await signInWithPopup(this.auth, provider);
            console.log("Signed in as:", credentials.user);
            this.router.navigate(["/app/decks"]);
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    }
}
