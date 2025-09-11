import { TestBed } from "@angular/core/testing";

import { PracticeFeatureService } from "./practice-feature.service";

describe("PracticeFeatureService", () => {
    let service: PracticeFeatureService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PracticeFeatureService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
