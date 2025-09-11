import { Component, inject } from "@angular/core";
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
} from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { map, startWith } from "rxjs";

@Component({
    selector: "app-mobile-nav",
    imports: [RouterOutlet, RouterLink, AsyncPipe, RouterLinkActive, MatIconModule],
    templateUrl: "./mobile-nav.html",
    styleUrl: "./mobile-nav.scss",
})
export class MobileNav {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    // showNav should reflect the deepest active child route's `data.showNav` value.
    // Traverse to the last activated child on each navigation and read its snapshot data.
    protected readonly showNav$ = this.router.events.pipe(
        startWith(null),
        map(() => {
            let r = this.route;
            while (r.firstChild) {
                r = r.firstChild;
            }
            return r.snapshot.data["showNav"] !== false;
        }),
    );
}
