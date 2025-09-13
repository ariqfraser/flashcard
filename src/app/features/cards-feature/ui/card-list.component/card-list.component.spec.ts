import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardListComponent } from "./card-list.component";
import { inputBinding } from "@angular/core";

describe("CardListComponent", () => {
    let component: CardListComponent;
    let fixture: ComponentFixture<CardListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CardListComponent, {
            bindings: [inputBinding("cards", () => [] as any)],
        });
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
