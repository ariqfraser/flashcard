import {
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    Renderer2,
    SecurityContext,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Directive({
    selector: "[safeInnerHtml]",
    standalone: true,
})
export class SafeInnerHtml {
    private readonly el = inject(ElementRef);
    private readonly renderer = inject(Renderer2);
    private readonly sanitizer = inject(DomSanitizer);

    readonly safeInnerHtml = input<string>("");
    /**
     * Bypass sanitisation when true
     */
    readonly trustHtml = input<boolean>(false);

    protected _onChanges = effect(() => {
        const raw = this.safeInnerHtml();
        if (this.trustHtml()) {
            const trusted = this.sanitizer.bypassSecurityTrustHtml(raw);
            this.renderer.setProperty(this.el.nativeElement, "innerHTML", trusted);
        } else {
            const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, raw);
            this.renderer.setProperty(this.el.nativeElement, "innerHTML", sanitized);
        }
    });
}
