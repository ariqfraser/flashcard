import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IconButton } from "./icon-button";
import { inputBinding } from "@angular/core";

describe("IconButton", () => {
    let component: IconButton;
    let fixture: ComponentFixture<IconButton>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IconButton],
        }).compileComponents();

        fixture = TestBed.createComponent(IconButton, {
            bindings: [
                inputBinding("icon", () => "home" as any),
                inputBinding("size", () => "small" as any),
            ],
        });
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
