import { Component, input, model, output } from "@angular/core";
import { CardDoc } from "@shared/types/firestore.types";

@Component({
    selector: "app-flashcard",
    imports: [],
    templateUrl: "./flashcard.html",
    styleUrl: "./flashcard.scss",
})
export class Flashcard {
    card = input.required<CardDoc>();
    flipped = input.required<boolean>();
}
