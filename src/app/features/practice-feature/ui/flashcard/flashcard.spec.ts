import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Flashcard } from "./flashcard";

describe("Flashcard", () => {
    let component: Flashcard;
    let fixture: ComponentFixture<Flashcard>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Flashcard],
        }).compileComponents();

        fixture = TestBed.createComponent(Flashcard);
        component = fixture.componentInstance;
        // provide required inputs before initial change detection
        // component expects callable inputs (signal-like): card() and flipped()
        component.card = (() => ({ front: "Q", back: "A" })) as any;
        component.flipped = (() => false) as any;
        fixture.detectChanges();
    });

    beforeEach(() => {
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
