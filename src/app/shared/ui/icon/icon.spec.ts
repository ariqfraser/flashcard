import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Icon } from "./icon";
import { inputBinding } from "@angular/core";

describe("Icon", () => {
    let component: Icon;
    let fixture: ComponentFixture<Icon>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Icon],
        }).compileComponents();

        fixture = TestBed.createComponent(Icon, {
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
