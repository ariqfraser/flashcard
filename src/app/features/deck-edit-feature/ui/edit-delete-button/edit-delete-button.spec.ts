import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditDeleteButton } from "./edit-delete-button";

describe("EditDeleteButton", () => {
    let component: EditDeleteButton;
    let fixture: ComponentFixture<EditDeleteButton>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditDeleteButton],
        }).compileComponents();

        fixture = TestBed.createComponent(EditDeleteButton);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
