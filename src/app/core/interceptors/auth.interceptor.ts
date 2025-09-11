import { inject, Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Auth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly auth = inject(Auth);
    private readonly router = inject(Router);

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const user = this.auth.currentUser;
        if (!user) {
            // Navigate to /auth and cancel the request with an error
            this.router.navigate(["/auth"]);
            return throwError(() => new Error("Not authenticated"));
        }

        // Optionally attach an auth header if you have a custom token
        // const token = (user as any)?.accessToken || null;
        // if (token) {
        //     req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        // }

        return next.handle(req);
    }
}

export const authInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
