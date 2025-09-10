import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MobileNav } from "./mobile-nav";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { Component } from "@angular/core";

@Component({})
class BlankCmp {}

describe("MobileNav", () => {
    let component: MobileNav;
    let fixture: ComponentFixture<MobileNav>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MobileNav,
                RouterModule.forRoot([
                    { path: "", component: BlankCmp },
                    { path: "simple", component: BlankCmp },
                ]),
                MatIconModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MobileNav);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
