import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddCardButton } from "./add-card-button";

describe("AddCardButton", () => {
    let component: AddCardButton;
    let fixture: ComponentFixture<AddCardButton>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddCardButton],
        }).compileComponents();

        fixture = TestBed.createComponent(AddCardButton);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
