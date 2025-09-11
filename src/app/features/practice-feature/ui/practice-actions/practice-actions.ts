import { Component, effect, model, output, signal } from "@angular/core";

@Component({
    selector: "app-practice-actions",
    imports: [],
    templateUrl: "./practice-actions.html",
    styleUrl: "./practice-actions.scss",
})
export class PracticeActions {
    protected readonly hasFlipped = signal(false);

    flipClicked = output();
    wrongClicked = output();
    correctClicked = output();

    handleFlip() {
        this.hasFlipped.set(true);
        this.flipClicked.emit();
    }

    stateClick(state: "wrong" | "correct") {
        this.hasFlipped.set(false);
        if (state === "wrong") {
            this.wrongClicked.emit();
        } else {
            this.correctClicked.emit();
        }
    }
}
