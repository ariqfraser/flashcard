import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { SafeInnerHtml } from "./safe-inner-html";

@Component({
    standalone: true,
    imports: [SafeInnerHtml],
    template: `<div [safeInnerHtml]="html"></div>`,
})
class HostComponent {
    html = "<span>hi</span>";
}

describe("SafeInnerHtml", () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HostComponent, SafeInnerHtml],
        }),
    );

    it("should create an instance via TestBed", () => {
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();

        const debug = fixture.debugElement.query(By.directive(SafeInnerHtml));
        expect(debug).toBeTruthy();

        const directiveInstance = debug.injector.get(SafeInnerHtml);
        expect(directiveInstance).toBeTruthy();
    });
});
