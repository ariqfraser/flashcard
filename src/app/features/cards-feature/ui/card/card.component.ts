import { Component, input, output } from "@angular/core";
import { Card } from "@shared/types/card.types";
import { IconButton } from "@shared/ui/icon-button/icon-button";

@Component({
    selector: "app-card",
    imports: [IconButton],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss",
    host: {
        "(pointerdown)": "onPointerDown()",
        "(pointerup)": "onPointerUp()",
        "(pointerleave)": "onPointerUp()",
        "(click)": "onClick($event)",
    },
})
export class CardComponent {
    readonly card = input.required<Card>();
    readonly isInSelectMode = input<boolean>(false);
    readonly hold = output<Card>();
    readonly tap = output<Card>();

    #holdTimeout: ReturnType<typeof setTimeout> | null = null;

    onPointerDown() {
        if (this.isInSelectMode()) return;
        this.#holdTimeout = setTimeout(() => {
            this.hold.emit(this.card());
        }, 2000);
    }

    onPointerUp() {
        if (this.#holdTimeout) {
            clearTimeout(this.#holdTimeout);
            this.#holdTimeout = null;
        }
    }

    onClick(event: MouseEvent) {
        this.tap.emit(this.card());
    }
}
