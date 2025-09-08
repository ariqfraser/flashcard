import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginFeature } from "./login-feature";

describe("LoginFeature", () => {
    let component: LoginFeature;
    let fixture: ComponentFixture<LoginFeature>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginFeature],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
