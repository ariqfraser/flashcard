import { TestBed } from "@angular/core/testing";

import { DeckEditService } from "./deck-edit.service";

describe("DeckEditService", () => {
    let service: DeckEditService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DeckEditService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
