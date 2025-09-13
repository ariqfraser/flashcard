import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Nav } from "./nav";
import { RouterModule } from "@angular/router";
import { Component } from "@angular/core";

@Component({})
class BlankCmp {}

describe("Nav", () => {
    let component: Nav;
    let fixture: ComponentFixture<Nav>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                Nav,
                RouterModule.forRoot([
                    { path: "", component: BlankCmp },
                    { path: "simple", component: BlankCmp },
                ]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(Nav);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
