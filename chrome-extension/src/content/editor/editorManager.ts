import { PAGE_MESSAGES } from "./page/messages";
import { BridgeReady } from "./bridge/ready";

export class EditorManager {
    ready = new BridgeReady();

    async load(markdown: string) {
        await this.ready.wait();
        console.log("[Editor] Sending Markdown");
        window.postMessage(
            {
                type: PAGE_MESSAGES.SET_MARKDOWN,
                markdown,
            },
            "*"
        );
    }
}
