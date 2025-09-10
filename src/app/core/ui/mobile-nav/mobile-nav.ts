import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-mobile-nav",
    imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
    templateUrl: "./mobile-nav.html",
    styleUrl: "./mobile-nav.scss",
})
export class MobileNav {}
