import { ShareButtonObserver } from "./observer";

export class ShareManager {
    observer = new ShareButtonObserver();

    async openPostEditor() {
        console.log("[Share] Waiting for Share button...");
        const button = await this.observer.waitForButton();
        console.log("[Share] Clicking Share");
        button.click();
        console.log("[Share] Clicked.");
    }
}
