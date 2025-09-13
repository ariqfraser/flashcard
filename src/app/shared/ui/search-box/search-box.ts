import { Component, model } from "@angular/core";
import { IconButton } from "../icon-button/icon-button";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-search-box",
    imports: [IconButton, FormsModule],
    templateUrl: "./search-box.html",
    styleUrl: "./search-box.scss",
})
export class SearchBox {
    searchTerm = model<string | undefined>();

    clear() {
        this.searchTerm.set(undefined);
    }
}
