import { Component, inject } from "@angular/core";
import { AuthService } from "@core/services/auth.service";

@Component({
    selector: "app-login-feature",
    imports: [],
    templateUrl: "./login-feature.html",
    styleUrl: "./login-feature.scss",
})
export class LoginFeature {
    private readonly authService = inject(AuthService);

    async login() {
        await this.authService.signInWithGoogle();
    }
}
