import { getAllButtons } from "../utils/dom";
import { ShareButtonValidator } from "./validator";

export class ShareButtonObserver {
    validator = new ShareButtonValidator();

    waitForButton(timeout = 10000): Promise<HTMLButtonElement> {
        return new Promise((resolve, reject) => {
            // First check immediately
            const initialButtons = getAllButtons();
            console.log("[Share] Buttons:", initialButtons.length);
            
            const existing = initialButtons.find(button =>
                this.validator.isShareButton(button)
            );

            if (existing) {
                console.log("[Share] Share button detected");
                resolve(existing);
                return;
            }

            console.log("[Share] Observer started");
            const observer = new MutationObserver(() => {
                const buttons = getAllButtons();
                console.log("[Share] Buttons:", buttons.length);
                
                const button = buttons.find(button =>
                    this.validator.isShareButton(button)
                );

                if (button) {
                    console.log("[Share] Share button detected");
                    observer.disconnect();
                    clearTimeout(timer);
                    resolve(button);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });

            const timer = setTimeout(() => {
                observer.disconnect();
                reject(
                    new Error("Publishing is available from the Solutions tab after an accepted submission. Open the Solutions tab and try again.")
                );
            }, timeout);
        });
    }
}
