import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { Icon } from "@shared/ui/icon/icon";

@Component({
    selector: "app-nav",
    imports: [RouterOutlet, Icon, RouterLink, RouterLinkActive],
    templateUrl: "./nav.html",
    styleUrl: "./nav.scss",
})
export class Nav {}
