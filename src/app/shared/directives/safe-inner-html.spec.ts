import { SafeInnerHtml } from "./safe-inner-html";

describe("SafeInnerHtml", () => {
    it("should create an instance", () => {
        const directive = new SafeInnerHtml();
        expect(directive).toBeTruthy();
    });
});
