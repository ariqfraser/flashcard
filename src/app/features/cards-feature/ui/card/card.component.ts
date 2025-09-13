import { Component, input, output } from "@angular/core";
import { Card } from "@shared/types/card.types";
import { IconButton } from "@shared/ui/icon-button/icon-button";

const HOLD_DURATION_MS = 500;

@Component({
    selector: "app-card",
    imports: [IconButton],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss",
    host: {
        "(pointerdown)": "onPointerDown()",
        "(pointerup)": "onPointerUp()",
        "(pointerleave)": "clearTimeout()",
    },
})
export class CardComponent {
    readonly card = input.required<Card>();
    readonly isInSelectMode = input<boolean>(false);
    readonly hold = output<Card>();
    readonly tap = output<Card>();

    #holdTimeout: ReturnType<typeof setTimeout> | null = null;
    #disableNextClick = false;

    onPointerDown() {
        if (this.isInSelectMode()) return;
        this.#holdTimeout = setTimeout(() => {
            this.hold.emit(this.card());
            this.#disableNextClick = true;
        }, HOLD_DURATION_MS);
    }

    onPointerUp() {
        this.clearTimeout();
        if (this.#disableNextClick) {
            this.#disableNextClick = false;
            return;
        }
        this.tap.emit(this.card());
    }

    protected clearTimeout() {
        if (this.#holdTimeout) {
            clearTimeout(this.#holdTimeout);
            this.#holdTimeout = null;
        }
    }
}
