import { Component, input, model, signal } from "@angular/core";
import { Icon } from "../icon/icon";
import { SafeInnerHtml } from "@shared/directives/safe-inner-html";

@Component({
    selector: "app-training-card",
    imports: [Icon, SafeInnerHtml],
    templateUrl: "./training-card.html",
    styleUrls: ["./training-card.scss"],
})
export class TrainingCard {
    readonly front = input.required<string>();
    readonly back = input.required<string>();
    readonly showFront = model(true);
    readonly notes = input<string>("");
    protected readonly showNotes = signal(false);

    protected toggleNotes() {
        this.showNotes.update((value) => !value);
    }
}
