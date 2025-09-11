import { TestBed } from "@angular/core/testing";

import { DecksFeatureService } from "./decks-feature.service";

describe("DecksFeatureService", () => {
    let service: DecksFeatureService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DecksFeatureService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
