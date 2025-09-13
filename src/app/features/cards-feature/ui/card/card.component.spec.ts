import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardComponent } from "./card.component";
import { inputBinding } from "@angular/core";
import { Card } from "@shared/types/card.types";

describe("Card", () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CardComponent, {
            bindings: [inputBinding("card", () => ({ id: "1", front: "Q", back: "A" }) as Card)],
        });
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
