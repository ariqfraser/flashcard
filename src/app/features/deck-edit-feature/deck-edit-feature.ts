import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-deck-edit-feature",
    imports: [FormsModule],
    templateUrl: "./deck-edit-feature.html",
    styleUrl: "./deck-edit-feature.scss",
})
export class DeckEditFeature implements OnInit {
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    protected isNewDeck = this.route.snapshot.routeConfig?.path === "new";
    protected title = signal<string>("Untitled deck");
    protected description = signal<string>("");

    ngOnInit(): void {}

    handleCancel() {
        this.router.navigate(["app", "decks"]);
    }
}
