import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
} from "@angular/router";
import { Icon } from "@shared/ui/icon/icon";
import { map, startWith } from "rxjs";

@Component({
    selector: "app-nav",
    imports: [RouterOutlet, Icon, RouterLink, RouterLinkActive, AsyncPipe],
    templateUrl: "./nav.html",
    styleUrl: "./nav.scss",
})
export class Nav {
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    protected showNav$ = this.router.events.pipe(
        startWith(null),
        map(() => {
            let route = this.route;
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route.snapshot.data["showNav"] !== false;
        }),
    );
}
